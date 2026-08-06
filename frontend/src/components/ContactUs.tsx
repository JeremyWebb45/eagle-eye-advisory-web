import { useForm } from '@tanstack/react-form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { FORM_FIELDS } from '@/lib/consts';

const INPUT_CLASS =
  'bg-primary-foreground border-2 border-(--primary-dark-blue) pl-2 py-2 rounded-md text-(--primary-dark-blue)';
const LABEL_CLASS = 'text-(--primary-yellow)';
const FIELD_CONTAINER_CLASS = 'flex flex-col gap-2';

const getFirstError = (errors: string[] | undefined): string | null => {
  return errors && errors.length > 0 ? errors[0] : null;
};

export default function ContactUs({ active }: { active?: boolean }) {
  const form = useForm({
    defaultValues: {
      preferredName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      title: '',
    },
  });
  if (!active) {
    return <>Coming soon...</>;
  }
  return (
    <form
      className="flex flex-col max-w-lg gap-4 bg-(--primary-blue) border border-(--primary-dark-blue) p-4 rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {FORM_FIELDS.map((fieldConfig) => (
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
          nameErrors: state.fieldMeta.preferredName?.errors,
          emailErrors: state.fieldMeta.email?.errors,
          messageErrors: state.fieldMeta.message?.errors,
          isPristine: state.isPristine,
        })}
        children={({ nameErrors, emailErrors, messageErrors, isPristine }) => {
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
                <Button
                  disabled={isPristine}
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
  );
}
