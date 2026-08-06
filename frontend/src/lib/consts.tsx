import type { FormFieldConfig, Template } from '@/data/types';
import { Handshake, Home } from 'lucide-react';
import {
  handleEmailChange,
  handleMessageChange,
  handleNameChange,
} from './utils';

export const NAV_ITEMS = [
  {
    icon: <Home />,
    label: 'Home',
    to: '/',
  },
  {
    icon: <Handshake />,
    label: 'Partners',
    to: '/partners',
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

export const EXEC_SUITE_TEMPLATES: Template[] = [
  { title: 'Business Case  and Financial Justification', link: undefined },
  { title: 'Executive Dashboards and Presentations', link: undefined },
  { title: 'Capital Equipment (CAPEX) and ROI Models', link: undefined },
  { title: 'Alternative Scenarios and Sensitivity', link: undefined },
  {
    title: 'Custom Tailored Analysis and Output',
    link: 'Skopos CTS Framework - AUG 4 2026.pdf',
  },
];

export const ENG_SUITE_TEMPLATES: Template[] = [
  { title: 'Data Mining, Cleansing, and Forensics', link: undefined },
  { title: 'Operational  Requirements', link: undefined },
  { title: 'Inventory Holding Requirements', link: undefined },
  { title: 'Square Foot (SQFT) Requirements', link: undefined },
];

export const SYS_INT_TEMPLATES: Template[] = [
  { title: 'Data Cleansing and Data Elements', link: undefined },
  { title: 'Business Process Mapping', link: undefined },
  {
    title: 'Kinaxis Maestro Template',
    link: 'EEA - Kinaxis Template AUG 4 - website version.pdf',
  },
  { title: 'WMS Systems', link: undefined },
];

export const M_SUITE_TEMPLATES: Template[] = [
  { title: 'Business Requirements Definition', link: undefined },
  { title: 'Automation Evaluation and Design', link: undefined },
  { title: 'Technology Assessment and Evaluation', link: undefined },
  { title: 'Labor Models and Dashboards', link: undefined },
  { title: 'Customized Operations – Value Added Services', link: undefined },
];

export const FORM_FIELDS: FormFieldConfig[] = [
  {
    name: 'preferredName',
    label: 'Name',
    isRequired: true,
    validator: handleNameChange,
  },
  { name: 'company', label: 'Company' },
  { name: 'title', label: 'Title' },
  {
    name: 'email',
    label: 'Email',
    isRequired: true,
    validator: handleEmailChange,
  },
  { name: 'phone', label: 'Phone' },
  {
    name: 'message',
    label: 'Message',
    isRequired: true,
    component: 'textarea',
    validator: handleMessageChange,
  },
];
