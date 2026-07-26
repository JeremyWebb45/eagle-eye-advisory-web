import type { Guest } from '@/data/types';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import MealSelections from './MealSelections';
import type { UpdateMetaOptions, Updater } from '@tanstack/react-form';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import Required from './Required';

interface GuestRSVPDetailsProps {
  guest: Guest;
  setGuests: (updater: Updater<Guest[]>, options?: UpdateMetaOptions) => void;
}

export function GuestRSVPDetails({ guest, setGuests }: GuestRSVPDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleCheckboxChange = (coming: boolean) => {
    setGuests((guests) =>
      guests.map((g) => (g.name === guest.name ? { ...g, coming } : g))
    );
  };
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex w-full items-center justify-between font-semibold text-(--primary-dark-green)">
          <div className="flex items-center">{guest.name}</div>
          <ChevronDown
            className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-2 pl-1 flex h-fit flex-row">
        <span className="flex-1 max-w-px bg-(--primary-dark-green) flex mr-2" />
        <div className="flex flex-col gap-2 flex-1">
          <p>
            Are you coming?
            <Required />
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              Yes
              <Checkbox
                className="border border-(--primary-dark-green) bg-(--primary-tan)"
                checked={guest.coming === true}
                onCheckedChange={() => handleCheckboxChange(true)}
              />
            </div>
            <div className="flex items-center gap-2">
              No
              <Checkbox
                className="border border-(--primary-dark-green) bg-(--primary-tan)"
                checked={guest.coming === false}
                onCheckedChange={() => handleCheckboxChange(false)}
              />
            </div>
          </div>
          {guest.coming === true ? (
            <MealSelections
              guest={guest}
              selectedMeal={guest.mealSelection}
              setGuests={setGuests}
            />
          ) : guest.coming === false ? (
            <p>
              Sorry to hear you can't make it! We'll have to see you another
              time!
            </p>
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
