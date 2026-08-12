export type ContactUsFormData = {
  preferredName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  title: string;
};

type FormFieldConfig = {
  label: string;
  isRequired?: boolean;
  type?: 'text' | 'email' | 'password';
  component?: 'input' | 'textarea';
  validator?: (value: string) => void;
};

export type ContactFormFieldConfig = FormFieldConfig & {
  name: 'name' | 'email' | 'phone' | 'company' | 'message' | 'title';
};

export type LoginFormFieldConfig = FormFieldConfig & {
  name: 'email' | 'password';
};

export interface Template {
  title: string;
  link?: string;
}

export type NewLead = {
  name: string;
  email: string;
  title?: string;
  phone?: string;
  company?: string;
  message: string;
};

export type User = {
  email: string;
  name: string;
  company?: string;
  title?: string;
  phone?: string;
  status: string;
  isAdmin: boolean;
};

export type NavItem = {
  icon: React.JSX.Element;
  label: string;
  to: string;
};
