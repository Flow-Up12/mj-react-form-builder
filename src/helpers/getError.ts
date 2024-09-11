import { useFormContext } from "react-hook-form";

export const getError = (name: string) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorPath = name.split('.').reduce((acc, key) => {
    // Handle case where key might represent an array index
    if (acc && typeof acc === 'object' && key in acc) {
      return acc[key];
    } else if (acc && Array.isArray(acc)) {
      return acc[parseInt(key, 10)];
    }
    return undefined;
  }, errors);

  return errorPath?.message;
};