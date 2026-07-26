import InviteSelector from '@/components/rsvp-form/InviteSelector';
import SelectedInviteView from '@/components/rsvp-form/SelectedInviteView';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { Invite } from '@/data/types';
import { CalendarCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RSVP() {
  const [selectedInvite, setSelectedInvite] = useState<Invite | null>(null);
  return (
    <div className="flex flex-col items-center mt-14 gap-4 w-full flex-1 px-4">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex justify-between text-(--primary-dark-green)">
            <h1>RSVP</h1>
            <CalendarCheck className="text-(--primary-red)" />
          </CardTitle>
          <CardDescription className="text-(--primary-tan)">
            Reserve your parties' spots by filling out the form below. We can't
            wait to see you!!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <InviteSelector setSelectedInvite={setSelectedInvite} />
          {selectedInvite && (
            <>
              <Separator className="bg-(--primary-dark-green)" />
              <SelectedInviteView invite={selectedInvite} />
            </>
          )}
        </CardContent>
      </Card>
      <Link className="text-sm underline text-(--primary-red)" to="/rsvp/view">
        Already submitted your RSVP? View or edit it here.
      </Link>
    </div>
  );
}
