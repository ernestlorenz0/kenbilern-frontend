import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebaseAuth';
import { ref, get } from 'firebase/database';

export default function AdminRoute({ children }) {
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const unsub = auth.onAuthStateChanged(async (user) => {
      try {
        if (!user) {
          if (!cancelled) setAllowed(false);
          return;
        }
        const snap = await get(ref(db, `/roles/${user.uid}`));
        const role = snap.exists() ? snap.val() : null;
        if (!cancelled) setAllowed(role === 'admin');
      } catch (_) {
        if (!cancelled) setAllowed(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    });
    return () => { cancelled = true; try { unsub(); } catch {} };
  }, []);

  if (loading) return null;
  if (!allowed) return <Navigate to="/admin-login" replace />;
  return children;
}
