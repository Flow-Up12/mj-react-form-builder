import { useFormContext } from "react-hook-form";

// Checkbox Input Component
interface CheckboxInputProps {
  source: string;
  label: string;
  required?: boolean;
  helperText?: string;
  onChange?: (checked: boolean) => void; // Allow passing an onChange function
}

export const CheckboxInput = ({
  source,
  label,
  required = false,
  helperText,
  onChange,
}: CheckboxInputProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Get the current value of the checkbox
  const isChecked = watch(source);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setValue(source, checked); // Update the form state
    if (onChange) {
      onChange(checked); // Trigger the custom onChange handler
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          {...register(source, { required })}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className={`mr-2 h-4 w-4 ${
            errors[source] ? "border-red-500" : "border-gray-300"
          }`}
        />
        <label className="block text-left text-sm font-semibold">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      </div>
      {helperText && (
        <p className="text-gray-500 text-sm mt-1 text-left">{helperText}</p>
      )}
      {errors[source] && (
        <p className="text-red-500 text-sm mt-1 text-left">{`${errors[source]?.message}*`}</p>
      )}
    </div>
  );
};

export default CheckboxInput;