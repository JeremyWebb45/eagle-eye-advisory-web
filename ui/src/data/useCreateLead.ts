import { getEnvVars } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { NewLead } from './types';

const API_URL = getEnvVars().apiUrl;

export default function useCreateLead() {
  const createLeadMutation = useMutation({
    mutationFn: async (newLead: NewLead) => {
      const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLead),
      });
      if (!response.ok) {
        throw new Error('Failed to create lead');
      }
      return response.json();
    },
  });
  const createLead = useCallback(
    async (newLead: NewLead) => {
      return createLeadMutation.mutateAsync(newLead);
    },
    [createLeadMutation]
  );

  return createLead;
}
