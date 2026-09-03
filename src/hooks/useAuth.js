import { useSelector } from 'react-redux';
import { selectAuthUser, selectIsAuthenticated } from '@/store/slices/authSlice';
import { ROLES } from '@/constants';

export function useAuth() {
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return {
    user,
    isAuthenticated,
    isAdmin: user?.role === ROLES.ADMIN,
  };
}
