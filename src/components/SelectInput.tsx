import React from "react";
import { useFormContext } from "react-hook-form";

interface SelectInputProps {
  source: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  helperText?: string;
  requiredMessage?: string;
  onChange?: (value: string) => void;
  defualtValue?: string;
}

export const SelectInput = ({
  source,
  label,
  options,
  required = false,
  helperText,
  requiredMessage,
  onChange,
  defualtValue,
}: SelectInputProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-6">
      <label className="block mb-1 text-left text-sm font-bold">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          className={`block w-full px-4 py-2 border rounded-md shadow-sm bg-white text-gray-900 appearance-none focus:outline-none focus:ring-2 transition-all duration-200 ${
            errors[source]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-800"
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1.5em 1.5em",
          }}
          {...register(source, {
            required: required
              ? `${label} ${requiredMessage ? requiredMessage : "is required"}`
              : false,
          })}
          defaultValue={defualtValue}
          onChange={(e) => {
            setValue(source, e.target.value);
            if (onChange) {
              onChange(e.target.value);
            }
          }}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {errors[source] && (
          <p className="text-red-500 text-sm mt-1 text-left">
            {`${errors[source]?.message}*`}
          </p>
        )}
      </div>
      {helperText && !errors[source] && (
        <p className="text-gray-500 text-sm mt-1 text-left">{helperText}</p>
      )}
    </div>
  );
};
