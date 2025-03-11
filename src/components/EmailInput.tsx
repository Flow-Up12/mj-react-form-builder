import React from "react";
import { useFormContext } from "react-hook-form";
import { ChangeEvent } from "react";
import { getError } from "../helpers/getError";

interface EmailInputProps {
  source: string;
  label: string;
  required?: boolean;
  helperText?: string;
  requiredMessage?: string;
  maxLength?: number;
}

export const EmailInput = ({
  source,
  label,
  required = false,
  helperText,
  requiredMessage,
  maxLength,
}: EmailInputProps) => {
  const { register, setValue } = useFormContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    setValue(source, value);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 text-left text-sm font-semibold">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type="email"
        {...register(source, {
          required: required ? `${label} ${requiredMessage ? requiredMessage : "is required"}` : false,
          maxLength: maxLength ? { value: maxLength, message: `${label} cannot exceed ${maxLength} characters` } : undefined,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format",
          },
        })}
        onChange={handleChange}
        className={`input-field text-left p-2 w-full border rounded-md focus:outline-none ${
          getError(source)
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-blue-800"
        }`}
      />
      {helperText && !getError(source) && (
        <p className="text-gray-500 text-sm mt-1 text-left">{helperText}</p>
      )}
      {getError(source) && (
        <p className="text-red-500 text-sm mt-1 text-left">{`${getError(source)}*`}</p>
      )}
    </div>
  );
};