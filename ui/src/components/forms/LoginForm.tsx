import useLogIn from '@/data/useLogIn';
import {
  FIELD_CONTAINER_CLASS,
  INPUT_CLASS,
  LABEL_CLASS,
  LOGIN_FORM_FIELDS,
} from '@/lib/utils';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { getFirstError } from '@/lib/utils';
import { Button } from '../ui/button';
import { useQueryClient } from '@tanstack/react-query';

export default function LoginForm() {
  const logIn = useLogIn();
  const navigate = useNavigate();
  const contactInfo = localStorage.getItem('contactInfo');
  const qc = useQueryClient();
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      toast.info('Signing in...');
      try {
        const newUser = await logIn(values.value);
        await qc.setQueryData(['me'], newUser);
        navigate('/internal');
        toast.success('Success!');
      } catch (error) {
        console.error('Failed to sign in lead:', error);
        toast.error('Failed to sign in. Please try again later.');
      }
    },
  });
  return (
    <div className="flex flex-col-reverse lg:flex-row gap-8 bg-(--primary-blue) border border-(--primary-dark-blue) p-4 rounded-lg">
      <form
        className="flex flex-col lg:max-w-lg gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="text-primary-foreground flex flex-col gap-2">
          <p className="font-bold text-3xl">Log In</p>
          <p className="italic text-sm">
            Thanks for your inquiry
            {contactInfo ? `, ${JSON.parse(contactInfo).name}` : ''}. Please
            check your spam folder
            {contactInfo ? ` at ${JSON.parse(contactInfo).email}` : ''} if you
            are expecting credentials. Otherwise, we are still processing you
            request and will get back to you within 1 business day.
          </p>
        </div>
        {LOGIN_FORM_FIELDS.map((fieldConfig) => (
          <form.Field
            key={fieldConfig.name}
            name={fieldConfig.name}
            validators={
              fieldConfig.validator
                ? {
                    onSubmit: (field) =>
                      fieldConfig.validator?.(field.value ?? ''),
                  }
                : undefined
            }
            children={(field) => {
              const Component =
                fieldConfig.component === 'textarea' ? Textarea : Input;
              return (
                <div className={`${FIELD_CONTAINER_CLASS} ${LABEL_CLASS}`}>
                  <label htmlFor={fieldConfig.name}>
                    {fieldConfig.label}
                    {fieldConfig.isRequired && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <Component
                    value={field.state.value}
                    id={fieldConfig.name}
                    type={fieldConfig.type ?? 'text'}
                    className={INPUT_CLASS}
                    onChange={(e) => field.setValue(e.target.value)}
                  />
                </div>
              );
            }}
          />
        ))}
        <form.Subscribe
          selector={(state) => ({
            emailErrors: state.fieldMeta.email?.errors,
          })}
          children={({ emailErrors }) => {
            const emailError = getFirstError(emailErrors);
            return (
              <>
                {emailError && (
                  <div className="text-red-500 bg-red-200 p-2 rounded-md">
                    <b>Error(s) with submission:</b>
                    <ul>{<li>{emailError}</li>}</ul>
                  </div>
                )}
                <div className="flex gap-4 w-full justify-between">
                  <Button
                    type="submit"
                    className="flex-1 bg-(--primary-yellow) hover:bg-yellow-500 cursor-pointer rounded-md font-bold"
                  >
                    SUBMIT
                  </Button>
                </div>
              </>
            );
          }}
        />
      </form>
      <div className="flex flex-col flex-1 items-center justify-center gap-4">
        <span className="flex items-center aspect-square max-w-50 p-4 justify-center w-full bg-white rounded-full border-2 border-(--primary-yellow)">
          <img src="/logo.png" alt="Logo" width={150} />
        </span>
        <p className="font-bold text-center italic text-2xl text-(--primary-yellow)">
          Eagle Eye Advisory
        </p>
      </div>
    </div>
  );
}
