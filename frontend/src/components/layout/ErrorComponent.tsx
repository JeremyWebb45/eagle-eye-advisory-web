import { ShieldAlert } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Link } from 'react-router-dom';

export default function ErrorComponent() {
  return (
    <div className="w-full h-screen flex justify-center items-center p-4">
      <Card className="w-xl p-8 max-w-2xl">
        <CardHeader className="flex flex-col items-center gap-4 text-center">
          <ShieldAlert size={48} className="text-(--primary-red)" />
          <CardTitle className="text-2xl font-bold">
            There was an error loading the page.{' '}
            <Link to="/" className="underline" replace>
              Let's get you home.
            </Link>
          </CardTitle>
          <CardDescription className="text-(--primary-dark-green)">
            If you expect this to load, please contact Jeremy.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
