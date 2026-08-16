import { LoaderCircle } from 'lucide-react';

interface LoadingErrorProps {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

export default function LoadingError({
  isLoading,
  error,
  children,
}: LoadingErrorProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <LoaderCircle className="animate-spin" size={40} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return <>{children}</>;
}
