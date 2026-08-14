import { getEnvVars } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { UpdateUserInput, User } from './types';

const API_URL = getEnvVars().apiUrl;

export default function useUpdateUser() {
  const qc = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateUserInput;
    }) => {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      return (await response.json()) as User;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const updateUser = useCallback(
    async (userId: string, data: UpdateUserInput) => {
      return updateUserMutation.mutateAsync({ userId, data });
    },
    [updateUserMutation]
  );

  return updateUser;
}
