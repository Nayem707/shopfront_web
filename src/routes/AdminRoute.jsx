import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

// Role-based guard: requires authentication AND the ADMIN role.
export default function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  if (!isAdmin) {
    return <Navigate to={ROUTES.HOME} replace />;
  }
  return <Outlet />;
}
