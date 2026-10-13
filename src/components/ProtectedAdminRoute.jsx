import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ProtectedAdminRoute = ({ children }) => {
  const [session, setSession] = useState(undefined); // undefined = still checking

  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Still loading — show nothing (or a spinner)
  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-cyan-400 text-xl font-mono">
        Verifying session...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedAdminRoute;