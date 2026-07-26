import { QueryClient, useMutation } from '@tanstack/react-query';
import type { Invite } from './types';
import { useCallback } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function useInvites() {
  const inviteMutation = useMutation({
    mutationFn: async (invite: Invite) => {
      try {
        // SSR: use internal Docker network; Browser: use relative path (nginx proxies)
        const isSSR = typeof window === 'undefined';
        const base = isSSR
          ? (import.meta.env.VITE_API_URL_SSR as string) || 'http://api:5000'
          : (import.meta.env.VITE_API_URL as string) || '/api';
        const path =
          (import.meta.env.VITE_API_INVITES_PATH as string) || '/invites';
        const basePath = `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
        const url = `${basePath}/${encodeURIComponent(invite.id)}`;

        const res = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: invite.email,
            guests: invite.guests,
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to update invite: ${res.status} ${text}`);
        }

        return (await res.json()) as Invite;
      } catch (error) {
        console.error('Error updating invite:', error);
        throw error; // Re-throw to let TanStack handle the error state
      }
    },
  });

  const updateInvite = useCallback(
    async (invite: Invite) => {
      const res = await inviteMutation.mutateAsync(invite);
      localStorage.setItem('invite', invite.id);
      return res;
    },
    [inviteMutation]
  );

  return updateInvite;
}

export function prefetchInvites(qc: QueryClient) {
  return qc.fetchQuery<Invite[]>({
    queryKey: ['invites'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/invites`);
      if (!response.ok) {
        throw new Error('Failed to prefetch RSVP data');
      }
      return response.json();
    },
  });
}
