export type ContactUsFormData = {
  preferredName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  title: string;
};

export interface FormFieldConfig {
  name: 'preferredName' | 'email' | 'phone' | 'company' | 'message' | 'title';
  label: string;
  isRequired?: boolean;
  component?: 'input' | 'textarea';
  validator?: (value: string) => void;
}

export interface Template {
  title: string;
  link?: string;
}
