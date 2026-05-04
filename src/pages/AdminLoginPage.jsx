import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, auth, db } from '../firebaseAuth';
import { ref, get } from 'firebase/database';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userData = await login(email, password, { remember: false });
      const user = auth.currentUser;
      if (!user) throw new Error('Login failed');
      const snap = await get(ref(db, `/roles/${user.uid}`));
      const role = snap.exists() ? snap.val() : null;
      if (role !== 'admin') {
        await auth.signOut();
        throw new Error('This account is not authorized for admin access.');
      }
      sessionStorage.setItem('user', JSON.stringify({ ...userData, uid: user.uid }));
      navigate('/admin');
    } catch (err) {
      setError(err?.message || 'Unable to sign in as admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%)' }}>
      <div className="w-full max-w-md bg-white/95 rounded-2xl shadow-xl p-8" style={{ border: '1px solid rgba(0, 61, 122, 0.1)' }}>
        <div className="mb-6">
          <h1 className="text-3xl font-black" style={{ color: '#003D7A' }}>Admin Sign In</h1>
          <p className="text-sm mt-1" style={{ color: '#2C2C2C' }}>Only authorized administrators may proceed.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold" style={{ color: '#003D7A' }}>Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-white rounded-xl border-2 focus:outline-none"
              style={{ borderColor: '#E5E5E5' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold" style={{ color: '#003D7A' }}>Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-white rounded-xl border-2 focus:outline-none"
              style={{ borderColor: '#E5E5E5' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-bold"
            style={{ backgroundColor: '#003D7A' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-sm font-semibold" style={{ color: '#003D7A' }}>Back to user login</Link>
        </div>
      </div>
    </div>
  );
}
