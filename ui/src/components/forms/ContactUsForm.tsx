import { useForm } from '@tanstack/react-form';
import { getLocalContactInfo } from '@/lib/utils';
import {
  FIELD_CONTAINER_CLASS,
  CONTACT_FORM_FIELDS,
  INPUT_CLASS,
  LABEL_CLASS,
} from '@/lib/utils';
import useCreateLead from '@/data/useCreateLead';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { getFirstError } from '@/lib/utils';

export default function ContactUsForm() {
  const createLead = useCreateLead();
  const navigate = useNavigate();
  const localContactInfo = getLocalContactInfo();
  const form = useForm({
    defaultValues: localContactInfo,
    onSubmit: async (values) => {
      if (!values.value) {
        return;
      }
      toast.info('Submitting your information. Please wait...');
      try {
        await createLead(values.value);
        localStorage.setItem('contactInfo', JSON.stringify(values.value));
        localStorage.setItem('showContactThankYou', 'true');
        navigate('/log-in');
        toast.success('Your information has been submitted successfully!');
      } catch (error) {
        console.error('Failed to create lead:', error);
        toast.error(
          'Failed to submit your information. Please try again later.'
        );
      }
    },
  });
  return (
    <div className="bg-(--primary-blue) flex flex-col-reverse lg:flex-row gap-8 border border-(--primary-dark-blue) p-4 rounded-lg">
      <form
        className="flex flex-col lg:max-w-lg gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="text-primary-foreground flex flex-col gap-2">
          <p className="font-bold text-3xl">Contact Us</p>
          <p className="italic text-sm">
            To protect our intellectual property, we require you to contact us
            for an account before viewing any internal content.{' '}
            <b>
              Please fill out the form below and we will respond within 1
              business day.
            </b>
          </p>
        </div>
        {CONTACT_FORM_FIELDS.map((fieldConfig) => (
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
                    disabled={!!localContactInfo}
                    id={fieldConfig.name}
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
            nameErrors: state.fieldMeta.name?.errors,
            emailErrors: state.fieldMeta.email?.errors,
            messageErrors: state.fieldMeta.message?.errors,
            isPristine: state.isPristine,
          })}
          children={({
            nameErrors,
            emailErrors,
            messageErrors,
            isPristine,
          }) => {
            const nameError = getFirstError(nameErrors);
            const emailError = getFirstError(emailErrors);
            const messageError = getFirstError(messageErrors);
            const hasErrors = nameError || emailError || messageError;
            return (
              <>
                {hasErrors && (
                  <div className="text-red-500 bg-red-200 p-2 rounded-md">
                    <b>Error(s) with submission:</b>
                    <ul>
                      {nameError && <li>{nameError}</li>}
                      {emailError && <li>{emailError}</li>}
                      {messageError && <li>{messageError}</li>}
                    </ul>
                  </div>
                )}
                <div className="flex gap-4 w-full justify-between">
                  {localContactInfo ? (
                    <p className="flex w-full text-center text-(--primary-yellow)">
                      Thanks for your request. Check your inbox for credentials
                      otherwise we are still processing it
                    </p>
                  ) : (
                    <Button
                      disabled={isPristine}
                      type="submit"
                      className="flex-1 bg-(--primary-yellow) hover:bg-yellow-500 cursor-pointer rounded-md font-bold"
                    >
                      SUBMIT
                    </Button>
                  )}
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
