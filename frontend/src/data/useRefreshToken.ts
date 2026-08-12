import { useMutation } from '@tanstack/react-query';
import { getEnvVars } from '@/lib/utils';
import { useCallback } from 'react';

const API_URL = getEnvVars().apiUrl;

export default function useRefreshToken() {
  const refreshMutation = useMutation({
    mutationFn: async () => {
      return await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
    },
  });
  return useCallback(async () => {
    return await refreshMutation.mutateAsync();
  }, [refreshMutation]);
}
