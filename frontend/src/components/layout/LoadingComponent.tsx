import { LoaderCircle } from 'lucide-react';

export default function LoadingComponent() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoaderCircle size={48} className="animate-spin text-(--primary-green)" />
    </div>
  );
}
