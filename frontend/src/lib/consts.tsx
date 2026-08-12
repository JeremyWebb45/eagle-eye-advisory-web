import type {
  ContactFormFieldConfig,
  LoginFormFieldConfig,
  NavItem,
  Template,
} from '@/data/types';
import { Contact, Handshake, Home, LogIn, ShieldLock } from 'lucide-react';

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

export const NAV_ITEMS: NavItem[] = [
  {
    icon: <Home />,
    label: 'Home',
    to: '/internal',
  },
  {
    icon: <Handshake />,
    label: 'Partners',
    to: '/internal/partners',
  },
  {
    icon: <LogIn />,
    label: 'Log In',
    to: '/log-in',
  },
  {
    icon: <Contact />,
    label: 'Contact Us',
    to: '/',
  },
  {
    icon: <ShieldLock />,
    label: 'Admin',
    to: '/internal/admin',
  },
];

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

export const LOGIN_FORM_FIELDS: LoginFormFieldConfig[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    isRequired: true,
    validator: handleEmailChange,
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    isRequired: true,
  },
];

export const CONTACT_FORM_FIELDS: ContactFormFieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    isRequired: true,
    validator: handleNameChange,
  },
  { name: 'company', label: 'Company', type: 'text' },
  { name: 'title', label: 'Title', type: 'text' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    isRequired: true,
    validator: handleEmailChange,
  },
  { name: 'phone', label: 'Phone', type: 'text' },
  {
    name: 'message',
    label: 'Message',
    isRequired: true,
    component: 'textarea',
    validator: handleMessageChange,
  },
];

export const INPUT_CLASS =
  'bg-primary-foreground border-2 border-(--primary-dark-blue) pl-2 py-2 rounded-md text-(--primary-dark-blue)';
export const LABEL_CLASS = 'text-(--primary-yellow)';
export const FIELD_CONTAINER_CLASS = 'flex flex-col gap-2';
