import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

// Prevents an already-authenticated user from seeing login/register again.
export default function GuestRoute() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;
  return <Outlet />;
}
