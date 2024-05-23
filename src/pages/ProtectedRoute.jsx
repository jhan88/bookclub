import React from 'react';
import { useUserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
}
