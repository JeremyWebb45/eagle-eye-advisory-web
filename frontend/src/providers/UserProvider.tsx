import { createContext, useContext } from 'react';
import type { User } from '@/data/types';
import useGetMe from '@/data/useGetMe';
import { LoaderCircle } from 'lucide-react';

type UserContextType = {
  user: User | null;
  error: Error | null;
};

const UserContext = createContext<UserContextType>({
  user: null,
  error: null,
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading: loading, error } = useGetMe();
  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <LoaderCircle
          size={48}
          className="animate-spin text-(--primary-blue)"
        />
      </div>
    );
  }
  return (
    <UserContext.Provider value={{ user: user ?? null, error }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
