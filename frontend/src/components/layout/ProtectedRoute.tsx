import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUserContext } from '@/providers/UserProvider';

export default function ProtectedRoute() {
  const { user, error } = useUserContext();
  const location = useLocation();
  if (error || !user) {
    return <Navigate to="/log-in" />;
  }
  if (location.pathname.includes('/admin') && !user.isAdmin) {
    return <Navigate to="/internal" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
