import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { admin } = useAdminAuth();
  if (!admin) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
