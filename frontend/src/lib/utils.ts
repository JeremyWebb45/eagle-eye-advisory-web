import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleEmailChange = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() === '') {
    return 'Please enter an email to receive confirmation';
  }
  if (!emailRegex.test(email)) {
    return 'Must be a valid email';
  }
};

export const handleNameChange = (name: string) => {
  if (name.trim() === '') {
    return 'Please enter your name';
  }
};

export const handleMessageChange = (message: string) => {
  if (message.trim() === '') {
    return 'Please enter a message';
  }
};
