import LoginForm from '@/components/forms/LoginForm';
import { useUserContext } from '@/providers/UserProvider';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const { user } = useUserContext();
  if (user) {
    return <Navigate to="/internal" replace />;
  }
  return (
    <>
      <LoginForm />
    </>
  );
}
