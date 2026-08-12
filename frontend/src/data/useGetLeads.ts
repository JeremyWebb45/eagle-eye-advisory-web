import { getEnvVars } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import type { Lead } from './types';

const API_URL = getEnvVars().apiUrl;

export default function useGetLeads() {
  return useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/leads/`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      return (await response.json()) as Lead[];
    },
  });
}
