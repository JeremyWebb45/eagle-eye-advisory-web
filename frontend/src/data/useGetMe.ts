import { getEnvVars } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import type { User } from './types';
import useRefreshToken from './useRefreshToken';

const API_URL = getEnvVars().apiUrl;

export default function useGetMe() {
  const refreshToken = useRefreshToken();
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const meResponse = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include',
      });
      if (meResponse.status === 401) {
        const refreshResponse = await refreshToken();
        if (!refreshResponse.ok) {
          throw new Error('Failed to refresh user session');
        }
      }
      if (meResponse.ok) {
        return (await meResponse.json()) as User;
      }
      throw new Error('Failed to fetch user data');
    },
    retry: false,
  });
}
