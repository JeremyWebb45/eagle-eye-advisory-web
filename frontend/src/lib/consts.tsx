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

export const EXEC_SUITE_TEMPLATES = [
  'Business Case  and Financial Justification',
  'Executive Dashboards and Presentations',
  'Capital Equipment (CAPEX) and ROI Models',
  'Alternative Scenarios and Sensitivity',
  'Custom Tailored Analysis and Output',
];

export const ENG_SUITE_TEMPLATES = [
  'Data Mining, Cleansing, and Forensics',
  'Operational  Requirements',
  'Inventory Holding Requirements',
  'Square Foot (SQFT) Requirements',
];

export const SYS_INT_TEMPLATES = [
  'Data Cleansing and Data Elements',
  'Business Process Mapping',
  'Kinaxis Maestro Template',
  'WMS Systems',
];

export const M_SUITE_TEMPLATES = [
  'Business Requirements Definition',
  'Automation Evaluation and Design',
  'Technology Assessment and Evaluation',
  'Labor Models and Dashboards',
  'Customized Operations – Value Added Services',
];
