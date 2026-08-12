import ContactUsForm from '@/components/forms/ContactUsForm';
import { Link } from 'react-router-dom';

export default function ContactUs() {
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
