export type Guest = {
  name: string;
  mealSelection?: 'meat' | 'fish' | 'both' | 'veggies';
  dietaryRestrictions?: string;
  songRequests?: string;
  coming?: boolean;
};

export type Invite = {
  id: string;
  guests: Guest[];
  email: string;
};

type Count = {
  id: string;
  label: string;
  count: number;
};

export type Summary = {
  id: string;
  title: string;
  counts: Count[];
};
