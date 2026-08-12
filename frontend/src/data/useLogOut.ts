import { getEnvVars } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'sonner';

const API_URL = getEnvVars().apiUrl;

export default function useLogOut() {
  const qc = useQueryClient();
  const logOutMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    },
  });
  return useCallback(async () => {
    toast.info('Logging out...');
    try {
      await logOutMutation.mutateAsync();
      await qc.setQueryData(['me'], null);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Failed to log out:', error);
      toast.error('Failed to log out. Please try again later.');
    }
    return;
  }, [logOutMutation]);
}
