import { getEnvVars } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

const API_URL = getEnvVars().apiUrl;

export default function useDeleteLead() {
  const qc = useQueryClient();

  const deleteLeadMutation = useMutation({
    mutationFn: async (leadId: string) => {
      const response = await fetch(`${API_URL}/leads/${leadId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }
      return response.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['leads'] });
    },
  });

  const deleteLead = useCallback(
    async (leadId: string) => {
      return deleteLeadMutation.mutateAsync(leadId);
    },
    [deleteLeadMutation]
  );

  return deleteLead;
}
