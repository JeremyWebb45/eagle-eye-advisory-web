import type { Guest, Invite } from '@/data/types';
import { GuestRSVPDetails } from './GuestRSVPDetails';
import { useForm } from '@tanstack/react-form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Required from './Required';
import useInviteMutation from '@/data/useInvites';
import { toast } from 'sonner';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface SelectedInviteViewProps {
  invite: Invite;
  standalone?: boolean;
}

const handleEmailChange = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() === '') {
    return 'Please enter an email to receive confirmation';
  }
  if (!emailRegex.test(email)) {
    return 'Must be a valid email';
  }
};

const handleGuestChange = (guests: Guest[]) => {
  const allSelectionsMade = guests.every((guest) => guest.coming !== undefined);
  if (!allSelectionsMade) {
    return 'Please indicate whether each guest is coming or not';
  }
  const allMealsSelected = guests.every((guest) => {
    if (guest.coming) {
      return guest.mealSelection !== undefined;
    }
    return true;
  });
  if (!allMealsSelected) {
    return 'Please select a meal for each guest who is coming';
  }
};

export default function SelectedInviteView({
  invite,
  standalone = false,
}: SelectedInviteViewProps) {
  const updateInvite = useInviteMutation();
  const navigate = useNavigate();
  const initInvite = useRef<Invite>(invite);
  const form = useForm({
    defaultValues: initInvite.current,
    onSubmit: async (values) => {
      toast.info('Saving RSVP...');
      try {
        const newInviteVal = await updateInvite(values.value);
        initInvite.current = newInviteVal;
        form.reset();
        toast.success('RSVP saved successfully!');
        navigate('/rsvp/view');
      } catch (error) {
        toast.error('Error saving RSVP. Please try again.');
        console.error('Error updating invite:', error);
      }
    },
  });
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {!standalone && <p className="text-lg">Who's coming?</p>}
      <form.Field
        name="guests"
        validators={{
          onSubmit: (field) => {
            const guests = field.value ?? [];
            return handleGuestChange(guests);
          },
        }}
        children={(field) => {
          return field.state.value.map((guest) => (
            <GuestRSVPDetails
              key={guest.name}
              guest={guest}
              setGuests={field.setValue}
            />
          ));
        }}
      />
      <p>
        Confirmation Email
        <Required />
      </p>
      <form.Field
        name="email"
        validators={{
          onSubmit: (field) => {
            const email = field.value ?? '';
            return handleEmailChange(email);
          },
        }}
        children={(field) => (
          <div>
            <Input
              value={field.state.value}
              type="email"
              onChange={(e) => field.setValue(e.target.value)}
              className="bg-(--primary-tan) border-(--primary-dark-green) text-(--primary-dark-green) border"
              placeholder="Enter an email to get confirmation at..."
            />
          </div>
        )}
      />
      <form.Subscribe
        selector={(state) => ({
          guestErrors: state.fieldMeta.guests?.errors,
          emailErrors: state.fieldMeta.email?.errors,
          isPristine: state.isPristine,
        })}
        children={({ guestErrors, emailErrors, isPristine }) => {
          let guestError: string | null = null;
          let emailError: string | null = null;
          if (guestErrors && guestErrors.length > 0) {
            guestError = guestErrors[0];
          }
          if (emailErrors && emailErrors.length > 0) {
            emailError = emailErrors[0];
          }
          const hasErrors = guestError || emailError;
          return (
            <>
              {hasErrors && (
                <div className="text-red-500 bg-red-200 p-2 rounded-md">
                  <b>Error(s) with submission:</b>
                  <ul>
                    {guestError && <li>{guestError}</li>}
                    {emailError && <li>{emailError}</li>}
                  </ul>
                </div>
              )}
              <div className="flex gap-4 w-full justify-between">
                <Button
                  disabled={isPristine}
                  type="submit"
                  className="flex-1 bg-(--primary-red)"
                >
                  {standalone ? 'Save' : 'RSVP'}
                </Button>
                <Button
                  type="reset"
                  variant="secondary"
                  className="flex-1"
                  onClick={(e) => {
                    // Avoid unexpected resets of form elements (especially <select> elements)
                    e.preventDefault();
                    form.reset();
                  }}
                >
                  Reset
                </Button>
              </div>
            </>
          );
        }}
      />
    </form>
  );
}
