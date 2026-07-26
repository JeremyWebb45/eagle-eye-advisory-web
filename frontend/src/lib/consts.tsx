import { CalendarCheck, Gift, Home, Info, MapPin } from 'lucide-react';

export const NAV_ITEMS = [
  {
    icon: <Home />,
    label: 'Home',
    to: '/',
  },
  {
    icon: <CalendarCheck />,
    label: 'RSVP',
    to: '/rsvp',
  },
  {
    icon: <Info />,
    label: 'Wedding Details',
    to: '/details',
  },
  {
    icon: <MapPin />,
    label: 'Travel & Stay',
    to: '/travel',
  },
  {
    icon: <Gift />,
    label: 'Registry',
    to: '/registry',
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
