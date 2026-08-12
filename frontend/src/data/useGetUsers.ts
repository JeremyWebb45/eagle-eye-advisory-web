import { getEnvVars } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import type { User } from './types';

const API_URL = getEnvVars().apiUrl;

export default function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/users/`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return (await response.json()) as User[];
    },
  });
}
