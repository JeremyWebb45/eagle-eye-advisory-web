import ContactUsForm from '@/components/forms/ContactUsForm';
import { useUserContext } from '@/providers/UserProvider';
import { Link, Navigate } from 'react-router-dom';

export default function ContactUs() {
  const { user } = useUserContext();
  if (user) {
    return <Navigate to="/internal" replace />;
  }
  return (
    <>
      <ContactUsForm />
      <p className="w-full flex items-center justify-center gap-2 text-(--primary-blue) text-lg italic">
        Already have an account?
        <Link to="/log-in" className="underline">
          Log in
        </Link>
      </p>
    </>
  );
}
