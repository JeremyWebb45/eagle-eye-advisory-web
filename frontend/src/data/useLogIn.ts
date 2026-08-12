import { getEnvVars } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { User } from './types';

const API_URL = getEnvVars().apiUrl;

export default function useLogIn() {
  const useLogInMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      return (await response.json()) as User;
    },
  });
  const logIn = useCallback(
    async (data: { email: string; password: string }) => {
      return await useLogInMutation.mutateAsync(data);
    },
    [useLogInMutation]
  );

  return logIn;
}
