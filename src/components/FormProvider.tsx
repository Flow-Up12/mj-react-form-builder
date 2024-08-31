import { useForm, FormProvider } from 'react-hook-form';

interface FormProps {
    children: React.ReactNode;
    defaultValues?: Record<string, any>;
    test?: boolean;
}

const Form = ({ children, defaultValues }: FormProps) => {
  
  const methods = useForm({ defaultValues});

  return (
    <FormProvider {...methods}>
      <form>
        {children}
      </form>
    </FormProvider>
  );
};


export { Form };