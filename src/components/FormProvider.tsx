import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

interface FormProps {
    children: React.ReactNode;
    defaultValues?: Record<string, any>;
    test?: boolean;
    onSubmit?: (data: Record<string, any>) => void;
}

const Form = ({ children, onSubmit, defaultValues }: FormProps) => {
  
  const methods = useForm({ defaultValues});

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}>
        {children}
      </form>
    </FormProvider>
  );
};


export { Form };
