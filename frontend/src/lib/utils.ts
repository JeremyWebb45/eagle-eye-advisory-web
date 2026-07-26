import type { Guest } from '@/data/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPartyString(guests: Guest[]) {
  return guests.map((guest) => guest.name).join(', ');
}
