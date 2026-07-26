import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL;

export default function useGetInviteById() {
  const query = useQuery({
    queryKey: ['invite'],
    queryFn: async () => {
      try {
        const inviteId = localStorage.getItem('invite');
        if (inviteId) {
          const url = `${API_URL}/invites`;
          const res = await fetch(`${url}/${inviteId}`, { method: 'GET' });
          if (!res.ok) throw new Error('Failed to fetch invite by id');
          return res.json();
        }
      } catch (error) {
        console.error('Error fetching invite by id:', error);
        return null; // Return null on error
      }
    },
  });
  return {
    invite: query.data,
    isLoading: query.isLoading,
  };
}
