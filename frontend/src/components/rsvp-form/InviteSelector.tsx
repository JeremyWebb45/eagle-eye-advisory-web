import type { Invite } from '@/data/types';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '../ui/combobox';
import InviteResult from './InviteResult';
import { getPartyString } from '@/lib/utils';
import { useLoaderData } from 'react-router-dom';

const EMPTY_MESSAGE = 'Not seeing your party? Contact the admin (Gabi)';

interface InviteSelectorProps {
  setSelectedInvite: (invite: Invite | null) => void;
}

export default function InviteSelector({
  setSelectedInvite,
}: InviteSelectorProps) {
  const invites = useLoaderData() as Invite[];
  console.log(invites);
  return (
    <Combobox
      items={invites}
      itemToStringLabel={(item: Invite) => getPartyString(item.guests)}
      itemToStringValue={(item: Invite) => getPartyString(item.guests)}
      onValueChange={setSelectedInvite}
    >
      <ComboboxInput
        placeholder="Search for your party..."
        className="border-(--primary-dark-green) border bg-(--primary-tan)"
      />
      <ComboboxContent className="border-(--primary-dark-green) border bg-(--primary-green)">
        <ComboboxEmpty className="text-black">{EMPTY_MESSAGE}</ComboboxEmpty>
        <ComboboxList>
          {(item: Invite) => (
            <ComboboxItem key={item.id} value={item} className="flex w-full">
              <InviteResult invite={item} />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
