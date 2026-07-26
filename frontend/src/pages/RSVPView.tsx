import LoadingComponent from '@/components/layout/LoadingComponent';
import SelectedInviteView from '@/components/rsvp-form/SelectedInviteView';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useGetInviteById from '@/data/useGetInviteById';
import { useQueryClient } from '@tanstack/react-query';
import { MailCheck } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export default function RSVPView() {
  const { invite, isLoading } = useGetInviteById();
  const [inviteId, setInviteId] = useState('');
  const qc = useQueryClient();
  const getInviteById = useCallback(async () => {
    if (inviteId === '') return;
    toast.info('Fetching invite...');
    localStorage.setItem('invite', inviteId);
    try {
      await qc.invalidateQueries({
        queryKey: ['invite'],
      });
      toast.success('Invite fetched successfully!');
    } catch (error) {
      toast.error('Failed to fetch invite.');
    }
  }, [inviteId, qc]);
  if (isLoading) {
    return <LoadingComponent />;
  }
  if (!invite) {
    return (
      <div className="flex flex-col items-center gap-4 mt-8 px-4">
        <p className="text-lg font-bold">
          No invite data found. Please enter your RSVP id to fetch it.
        </p>
        <Input
          value={inviteId}
          onChange={(e) => setInviteId(e.target.value)}
          className="border-(--primary-dark-green)"
          placeholder="Enter your RSVP ID..."
        />
        <Button
          onClick={getInviteById}
          disabled={inviteId === ''}
          className="bg-(--primary-green) border-(--primary-dark-green) border w-full"
        >
          Fetch Invite
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1 items-center gap-4 w-full mt-14 px-4">
      <Card className="flex w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex justify-between">
            <h1>View your RSVP</h1>
            <MailCheck className="text-(--primary-red)" />
          </CardTitle>
          <CardDescription className="text-(--primary-red)">
            *Invite ID: {invite.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SelectedInviteView invite={invite} standalone />
        </CardContent>
      </Card>
      <p className="text-(--primary-red) text-sm max-w-2xl">
        *Remember to save your Invite ID somewhere safe! You'll need it to view
        or edit your RSVP on a different device.
      </p>
    </div>
  );
}
