import React, { useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebaseAuth';
import { ref, get } from 'firebase/database';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function withTokenFetch(path, options = {}) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const token = await user.getIdToken();
  const headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${token}`,
  };
  if (options.body && !headers['Content-Type']) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    let err;
    try { err = await res.json(); } catch { err = {}; }
    throw new Error(err?.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');
  const [overview, setOverview] = useState(null);
  const [users, setUsers] = useState([]);
  const [nextUsersToken, setNextUsersToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rolesMap, setRolesMap] = useState({}); // uid -> true if admin

  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  const [filesTab, setFilesTab] = useState('generated');
  const [generatedFiles, setGeneratedFiles] = useState([]);

  // Files -> Users view
  const [filesUsers, setFilesUsers] = useState([]);
  const [filesUsersNextToken, setFilesUsersNextToken] = useState(null);
  const [selectedFilesUser, setSelectedFilesUser] = useState(null);
  const [selectedFilesUserHistory, setSelectedFilesUserHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState('');
  const [viewItem, setViewItem] = useState(null);
  const [manageUser, setManageUser] = useState(null); // user object from Users tab
  const [manageUserItems, setManageUserItems] = useState([]);
  const [manageLoading, setManageLoading] = useState(false);
  const [manageError, setManageError] = useState('');

  const tabs = useMemo(() => ([
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'files', label: 'Files' },
  ]), []);

  useEffect(() => {
    if (tab === 'overview') reloadOverview();
    if (tab === 'users') { reloadUsers(); reloadOverview(); }
    if (tab === 'files') { reloadFiles(); reloadFilesUsers(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function reloadOverview() {
    setError('');
    try {
      const data = await withTokenFetch('/admin/overview');
      setOverview(data);
    } catch (e) {
      setError(e.message);
    }
  }

  async function reloadUsers(pageToken) {
    setError('');
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (pageToken) q.set('pageToken', pageToken);
      const data = await withTokenFetch(`/admin/users${q.toString() ? `?${q.toString()}` : ''}`);
      setUsers(data.users || []);
      setNextUsersToken(data.nextPageToken || null);
      // fetch roles for current page
      const entries = await Promise.all(
        (data.users || []).map(async (u) => {
          try {
            const snap = await get(ref(db, `/roles/${u.uid}`));
            return [u.uid, snap.exists() && snap.val() === 'admin'];
          } catch {
            return [u.uid, false];
          }
        })
      );
      const map = Object.fromEntries(entries);
      setRolesMap(map);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(uid) {
    if (!confirm('Delete this user?')) return;
    setError('');
    try {
      await withTokenFetch('/admin/users/delete', { method: 'POST', body: JSON.stringify({ uid }) });
      await reloadUsers();
    } catch (e) {
      setError(e.message);
    }
  }

  async function setAdmin(uid, makeAdmin) {
    setError('');
    try {
      await withTokenFetch('/admin/roles/set', { method: 'POST', body: JSON.stringify({ uid, admin: !!makeAdmin }) });
      setRolesMap(prev => ({ ...prev, [uid]: !!makeAdmin }));
    } catch (e) {
      setError(e.message);
    }
  }

  async function deleteHistoryItem(uid, itemId) {
    setError('');
    try {
      await withTokenFetch(`/admin/history/${encodeURIComponent(uid)}/${encodeURIComponent(itemId)}`, { method: 'DELETE' });
      if (selectedFilesUser && uid === selectedFilesUser) {
        setSelectedFilesUserHistory(prev => prev.filter(i => i.id !== itemId));
      }
      if (manageUser && uid === manageUser.uid) {
        setManageUserItems(prev => prev.filter(i => i.id !== itemId));
      }
    } catch (e) {
      setError(e.message);
    }
  }

  async function openManageUser(u) {
    setManageUser(u);
    setManageLoading(true);
    setManageError('');
    try {
      const data = await withTokenFetch(`/admin/history/${encodeURIComponent(u.uid)}`);
      setManageUserItems(data.items || []);
    } catch (e) {
      setManageError(e.message);
      setManageUserItems([]);
    } finally {
      setManageLoading(false);
    }
  }

  async function applyPassword() {
    if (!selectedUser || newPassword.length < 6) {
      setError('Enter a password with at least 6 characters.');
      return;
    }
    setError('');
    try {
      await withTokenFetch('/admin/users/set-password', { method: 'POST', body: JSON.stringify({ uid: selectedUser.uid, newPassword }) });
      setNewPassword('');
      setSelectedUser(null);
      alert('Password updated.');
    } catch (e) {
      setError(e.message);
    }
  }

  async function reloadFiles() {
    setError('');
    try {
      const gen = await withTokenFetch('/admin/files/generated');
      setGeneratedFiles(gen.files || []);
    } catch (e) {
      setError(e.message);
    }
  }

  async function deleteFile(type, name) {
    if (!confirm('Delete this file?')) return;
    setError('');
    try {
      const rel = `${type === 'extracted' ? 'extracted_images' : 'generated_images'}/${name}`;
      await withTokenFetch('/admin/files', { method: 'DELETE', body: JSON.stringify({ path: rel }) });
      await reloadFiles();
    } catch (e) {
      setError(e.message);
    }
  }

  function fileUrl(type, name) {
    const path = `${type === 'generated' ? 'generated_images' : 'generated_images'}/${encodeURIComponent(name)}`;
    if (API_BASE) return `${API_BASE}/${path}`;
    return `/${path}`;
  }

  async function reloadFilesUsers(pageToken) {
    try {
      const q = new URLSearchParams();
      if (pageToken) q.set('pageToken', pageToken);
      const data = await withTokenFetch(`/admin/users${q.toString() ? `?${q.toString()}` : ''}`);
      setFilesUsers(data.users || []);
      setFilesUsersNextToken(data.nextPageToken || null);
    } catch (e) {
      // ignore here; shown in main error if needed
    }
  }

  async function loadUserHistory(uid) {
    setSelectedFilesUser(uid);
    setHistoryLoading(true);
    setHistoryError('');
    try {
      const data = await withTokenFetch(`/admin/history/${encodeURIComponent(uid)}`);
      setSelectedFilesUserHistory(data.items || []);
    } catch (e) {
      setHistoryError(e.message);
      setSelectedFilesUserHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  }

  async function deleteShared(id) {
    if (!confirm('Delete this shared slideshow?')) return;
    setError('');
    try {
      await withTokenFetch(`/admin/shared/${encodeURIComponent(id)}`, { method: 'DELETE' });
      await reloadShared();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-black" style={{ color: '#003D7A' }}>Admin Dashboard</h1>
          <button onClick={() => auth.signOut()} className="px-4 py-2 rounded-xl text-white font-semibold" style={{ backgroundColor: '#003D7A' }}>Sign out</button>
        </div>
        <div className="flex gap-2 mb-4">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-xl font-semibold ${tab === t.id ? 'text-white' : ''}`} style={{ backgroundColor: tab === t.id ? '#003D7A' : 'white', color: tab === t.id ? 'white' : '#003D7A', border: '1px solid #E5E5E5' }}>{t.label}</button>
          ))}
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        {tab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border" style={{ borderColor: '#E5E5E5' }}>
              <div className="text-sm text-gray-600">Users</div>
              <div className="text-3xl font-bold">{(users && users.length) ? users.length : (overview?.auth_users_count ?? '-')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white border" style={{ borderColor: '#E5E5E5' }}>
              <div className="text-sm text-gray-600">Generated Images</div>
              <div className="text-3xl font-bold">{overview?.files?.generated_images ?? '-'}</div>
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div className="bg-white border rounded-2xl p-4" style={{ borderColor: '#E5E5E5' }}>
            <div className="mb-3 text-sm font-semibold" style={{ color: '#003D7A' }}>Total Users: {(users && users.length) ? users.length : (overview?.auth_users_count ?? '-')}</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">UID</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.uid} className="border-t" style={{ borderColor: '#F0F0F0' }}>
                      <td className="p-2 whitespace-nowrap">{u.uid}</td>
                      <td className="p-2 whitespace-nowrap">{u.email || '-'}</td>
                      <td className="p-2 whitespace-nowrap">{u.displayName || '-'}</td>
                      <td className="p-2 flex gap-2">
                        <button onClick={() => setSelectedUser(u)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#003D7A' }}>Set Password</button>
                        <button onClick={() => openManageUser(u)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#2563EB' }}>Presentations</button>
                        {rolesMap[u.uid] ? (
                          <button onClick={() => setAdmin(u.uid, false)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#6B7280' }}>Remove Admin</button>
                        ) : (
                          <button onClick={() => setAdmin(u.uid, true)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#059669' }}>Make Admin</button>
                        )}
                        <button onClick={() => deleteUser(u.uid)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#B91C1C' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 flex justify-end gap-2">
              <button disabled={!nextUsersToken || loading} onClick={() => reloadUsers(nextUsersToken)} className="px-3 py-1 rounded-lg text-white disabled:opacity-50" style={{ backgroundColor: '#003D7A' }}>Next Page</button>
            </div>
            {selectedUser && (
              <div className="mt-4 p-3 border rounded-xl" style={{ borderColor: '#E5E5E5' }}>
                <div className="font-semibold mb-2" style={{ color: '#003D7A' }}>Set Password for {selectedUser.email || selectedUser.uid}</div>
                <div className="flex items-center gap-2">
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password (min 6 chars)" className="flex-1 px-3 py-2 border rounded-lg" style={{ borderColor: '#E5E5E5' }} />
                  <button onClick={applyPassword} className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: '#003D7A' }}>Apply</button>
                  <button onClick={() => { setSelectedUser(null); setNewPassword(''); }} className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#E5E5E5', color: '#003D7A' }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'files' && (
          <div className="bg-white border rounded-2xl p-4" style={{ borderColor: '#E5E5E5' }}>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setFilesTab('generated')} className={`px-3 py-1 rounded-lg font-semibold ${filesTab === 'generated' ? 'text-white' : ''}`} style={{ backgroundColor: filesTab === 'generated' ? '#003D7A' : 'white', color: filesTab === 'generated' ? 'white' : '#003D7A', border: '1px solid #E5E5E5' }}>Generated</button>
              <button onClick={() => setFilesTab('users')} className={`px-3 py-1 rounded-lg font-semibold ${filesTab === 'users' ? 'text-white' : ''}`} style={{ backgroundColor: filesTab === 'users' ? '#003D7A' : 'white', color: filesTab === 'users' ? 'white' : '#003D7A', border: '1px solid #E5E5E5' }}>Users</button>
            </div>
            {filesTab === 'generated' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {generatedFiles.map(f => (
                  <div key={f.name} className="p-3 border rounded-xl flex items-center justify-between gap-2" style={{ borderColor: '#E5E5E5' }}>
                    <div className="truncate">{f.name}</div>
                    <div className="flex gap-2 shrink-0">
                      <a href={fileUrl(filesTab, f.name)} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#003D7A' }}>View</a>
                      <button onClick={() => deleteFile(filesTab, f.name)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#B91C1C' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {filesTab === 'users' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-2xl p-3" style={{ borderColor: '#E5E5E5' }}>
                  <div className="font-semibold mb-2" style={{ color: '#003D7A' }}>Users</div>
                  <div className="space-y-2 max-h-96 overflow-auto">
                    {filesUsers.map(u => (
                      <button key={u.uid} onClick={() => loadUserHistory(u.uid)} className="w-full text-left px-3 py-2 border rounded-lg hover:bg-gray-50" style={{ borderColor: '#E5E5E5' }}>
                        <div className="font-medium">{u.email || u.uid}</div>
                        <div className="text-xs text-gray-600">{u.displayName || 'No name'}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button disabled={!filesUsersNextToken} onClick={() => reloadFilesUsers(filesUsersNextToken)} className="px-3 py-1 rounded-lg text-white disabled:opacity-50" style={{ backgroundColor: '#003D7A' }}>Next Page</button>
                  </div>
                </div>
                <div className="border rounded-2xl p-3" style={{ borderColor: '#E5E5E5' }}>
                  <div className="font-semibold mb-2" style={{ color: '#003D7A' }}>Presentations {selectedFilesUser ? `for ${selectedFilesUser}` : ''}</div>
                  {historyLoading && <div className="text-sm text-gray-600">Loading...</div>}
                  {historyError && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{historyError}</div>}
                  {!historyLoading && !historyError && (
                    <div className="space-y-2 max-h-96 overflow-auto">
                      {selectedFilesUserHistory.map(item => (
                        <div key={item.id} className="p-3 border rounded-lg" style={{ borderColor: '#E5E5E5' }}>
                          <div className="font-semibold">{item.filename || 'Untitled'}</div>
                          <div className="text-xs text-gray-600">{item.generatedAt}</div>
                          <div className="mt-2 flex gap-2">
                            <button onClick={() => setViewItem(item)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#003D7A' }}>View</button>
                            <button onClick={() => deleteHistoryItem(selectedFilesUser, item.id)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#B91C1C' }}>Delete</button>
                          </div>
                        </div>
                      ))}
                      {selectedFilesUser && selectedFilesUserHistory.length === 0 && (
                        <div className="text-sm text-gray-600">No presentations found.</div>
                      )}
                      {!selectedFilesUser && (
                        <div className="text-sm text-gray-600">Select a user to view their presentations.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    {/* Presentation Viewer Modal */}
    {viewItem && (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-auto p-4" style={{ border: '1px solid #E5E5E5' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="font-bold" style={{ color: '#003D7A' }}>{viewItem.filename || 'Untitled'} <span className="text-xs text-gray-600">{viewItem.generatedAt}</span></div>
            <button onClick={() => setViewItem(null)} className="px-3 py-1 rounded-lg" style={{ backgroundColor: '#E5E5E5', color: '#003D7A' }}>Close</button>
          </div>
          <pre className="text-xs whitespace-pre-wrap break-words">
{JSON.stringify(viewItem, null, 2)}
          </pre>
        </div>
      </div>
    )}
    {/* Manage User Presentations Modal */}
    {manageUser && (
      <div className="fixed inset-0 z-40 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[80vh] overflow-auto p-4" style={{ border: '1px solid #E5E5E5' }}>
          <div className="flex items-center justify-between mb-2">
            <div className="font-bold" style={{ color: '#003D7A' }}>Presentations for {manageUser.email || manageUser.uid}</div>
            <button onClick={() => setManageUser(null)} className="px-3 py-1 rounded-lg" style={{ backgroundColor: '#E5E5E5', color: '#003D7A' }}>Close</button>
          </div>
          {manageLoading && <div className="text-sm text-gray-600">Loading...</div>}
          {manageError && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{manageError}</div>}
          {!manageLoading && !manageError && (
            <div className="space-y-2">
              {manageUserItems.map(item => (
                <div key={item.id} className="p-3 border rounded-lg" style={{ borderColor: '#E5E5E5' }}>
                  <div className="font-semibold">{item.filename || 'Untitled'}</div>
                  <div className="text-xs text-gray-600">{item.generatedAt}</div>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => setViewItem(item)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#003D7A' }}>View</button>
                    <button onClick={() => deleteHistoryItem(manageUser.uid, item.id)} className="px-3 py-1 rounded-lg text-white" style={{ backgroundColor: '#B91C1C' }}>Delete</button>
                  </div>
                </div>
              ))}
              {manageUserItems.length === 0 && (
                <div className="text-sm text-gray-600">No presentations found.</div>
              )}
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
}
