import { useFormContext } from "react-hook-form";

export const getError = (name: string) => {
  const {
    formState: { errors },
  } = useFormContext();

  const errorPath = name.split(/[\.\[\]]+/).filter(Boolean).reduce((acc, key) => {
    // If the accumulator is valid (an object or array)
    if (acc && typeof acc === 'object') {
      // If the key is a valid array index, access it as an index
      if (Array.isArray(acc)) {
        const index = parseInt(key, 10);
        return acc[index];
      }
      // Otherwise, treat it as an object key
      return acc[key];
    }
    return undefined;
  }, errors);

  return errorPath?.message || null;
};