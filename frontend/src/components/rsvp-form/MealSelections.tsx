import type { Guest } from '@/data/types';
import type { UpdateMetaOptions, Updater } from '@tanstack/react-form';
import { Beef, Carrot, Fish, Plus } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import Required from './Required';

interface MealSelectionsProps {
  selectedMeal: Guest['mealSelection'];
  setGuests: (updater: Updater<Guest[]>, options?: UpdateMetaOptions) => void;
  guest: Guest;
}

const SELECTIONS = [
  {
    icon: <Beef />,
    value: 'meat',
  },
  {
    icon: <Fish />,
    value: 'fish',
  },
  {
    icon: (
      <div className="flex items-center">
        <Beef />
        <Plus size={16} />
        <Fish />
      </div>
    ),
    value: 'both',
  },
  {
    icon: <Carrot />,
    value: 'veggies',
  },
];

export default function MealSelections({
  selectedMeal,
  setGuests,
  guest,
}: MealSelectionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <p>
        What's to eat?
        <Required />
      </p>
      <div className="flex gap-4">
        {SELECTIONS.map((selection) => (
          <div
            key={selection.value}
            className={`
              ${selectedMeal === selection.value ? 'text-(--primary-red)' : ''} flex items-center
            `}
            onClick={() =>
              setGuests((guests) =>
                guests.map((g) =>
                  g.name === guest.name
                    ? {
                        ...g,
                        mealSelection:
                          selection.value as Guest['mealSelection'],
                      }
                    : g
                )
              )
            }
          >
            {selection.icon}
          </div>
        ))}
      </div>
      {selectedMeal && (
        <>
          <p>Any dietary restrictions?</p>
          <Textarea
            className="border border-(--primary-dark-green) text-(--primary-dark-green) bg-(--primary-tan)"
            value={guest.dietaryRestrictions || ''}
            onChange={(e) =>
              setGuests((guests) =>
                guests.map((g) =>
                  g.name === guest.name
                    ? { ...g, dietaryRestrictions: e.target.value }
                    : g
                )
              )
            }
          />
          <Separator className="bg-(--primary-dark-green) mt-2 mb-2" />
          <p>Any song requests?</p>
          <Textarea
            className="border border-(--primary-dark-green) text-(--primary-dark-green) bg-(--primary-tan)"
            value={guest.songRequests || ''}
            onChange={(e) =>
              setGuests((guests) =>
                guests.map((g) =>
                  g.name === guest.name
                    ? { ...g, songRequests: e.target.value }
                    : g
                )
              )
            }
          />
        </>
      )}
    </div>
  );
}
