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

export type Lead = {
  id: string;
  name: string;
  email: string;
  title?: string;
  phone?: string;
  company?: string;
  message: string;
  created_at: string;
};

export type User = {
  id?: string;
  email: string;
  name: string;
  company?: string;
  title?: string;
  phone?: string;
  status: string;
  isAdmin: boolean;
  created_at?: string;
  updated_at?: string;
};

export type CreateUserInput = {
  email?: string;
  preferred_name: string;
  password: string;
  company?: string;
  title?: string;
  phone?: string;
};

export type UpdateUserInput = {
  preferred_name?: string;
  company?: string;
  title?: string;
  phone?: string;
  status?: string;
};

export type NavItem = {
  icon: React.JSX.Element;
  label: string;
  to: string;
};
