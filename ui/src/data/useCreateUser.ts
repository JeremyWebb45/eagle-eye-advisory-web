import { getEnvVars } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { User } from './types';

const API_URL = getEnvVars().apiUrl;

type CreateUserParams = {
  leadId: string;
  tempPassword: string;
};

export default function useCreateUser() {
  const qc = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: async ({ leadId, tempPassword }: CreateUserParams) => {
      const response = await fetch(`${API_URL}/users/${leadId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ temp_password: tempPassword }),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      return (await response.json()) as User;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const createUser = useCallback(
    async (leadId: string, tempPassword: string) => {
      return createUserMutation.mutateAsync({ leadId, tempPassword });
    },
    [createUserMutation]
  );

  return createUser;
}
