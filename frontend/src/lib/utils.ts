import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NAV_ITEMS } from './consts';
import type { User, NewLead } from '@/data/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEnvVars = (): { apiUrl: string } => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return { apiUrl };
};

export const getFirstError = (errors: string[] | undefined): string | null => {
  return errors && errors.length > 0 ? errors[0] : null;
};

export const getLocalContactInfo = (): NewLead | null => {
  const contactInfo = localStorage.getItem('contactInfo');
  return contactInfo ? JSON.parse(contactInfo) : null;
};

export const getNavItems = (user: User | undefined) => {
  const userExists = user !== undefined;
  const isAdmin = userExists && user.isAdmin;
  return NAV_ITEMS.map((item) => {
    if (!userExists && item.to.includes('/internal')) {
      return undefined;
    }
    if (userExists && (item.to === '/log-in' || item.to === '/')) {
      return undefined;
    }
    if (!isAdmin && item.to === '/internal/admin') {
      return undefined;
    }
    return item;
  }).filter((item) => item !== undefined);
};
