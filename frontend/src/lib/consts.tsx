import { Home, ShieldCheck } from 'lucide-react';

export const NAV_ITEMS = [
  {
    icon: <Home />,
    label: 'Home',
    to: '/',
  },
  {
    icon: <ShieldCheck />,
    label: 'Admin',
    to: '/admin',
  },
];

export const getNavItems = () => {
  const inviteId = localStorage.getItem('invite');
  return NAV_ITEMS.map((item) => {
    if (inviteId && item.to === '/rsvp') {
      return { ...item, to: `${item.to}/view`, label: 'View RSVP' };
    }
    return item;
  });
};
