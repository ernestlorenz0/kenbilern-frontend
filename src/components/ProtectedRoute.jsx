import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseAuth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (cancelled) {
        return;
      }

      const isAllowed = Boolean(user);
      if (!isAllowed) {
        try {
          sessionStorage.removeItem('user');
          localStorage.removeItem('user');
        } catch (_) {
          // Ignore storage errors and continue redirecting to login.
        }
      }

      setAllowed(isAllowed);
      setLoading(false);
    });

    return () => {
      cancelled = true;
      try {
        unsubscribe();
      } catch (_) {
        // Ignore cleanup issues from auth subscription teardown.
      }
    };
  }, []);

  if (loading) {
    return null;
  }

  if (!allowed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
