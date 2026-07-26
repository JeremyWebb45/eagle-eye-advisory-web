import type { Invite } from '@/data/types';
import { useMemo } from 'react';
import { Button } from '../ui/button';
import { getPartyString } from '@/lib/utils';

export default function InviteResult({ invite }: { invite: Invite }) {
  const guestsForInvite = useMemo(() => {
    return getPartyString(invite.guests);
  }, [invite]);
  return (
    <Button
      className="cursor-pointer flex whitespace-normal w-full text-left line-clamp-1 text-ellipsis"
      variant="ghost"
    >
      {guestsForInvite}
    </Button>
  );
}
