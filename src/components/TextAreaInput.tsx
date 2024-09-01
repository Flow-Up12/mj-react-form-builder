import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface TextAreaProps {
  source: string;
  label: string;
  rows?: number;
  required?: boolean;
  helperText?: string;
  maxCharCount?: number;
  maxRows?: number; // New prop for maximum rows
}

const TextAreaInput = ({
  source,
  label,
  rows = 4,
  required = false,
  helperText,
  maxCharCount,
  maxRows = 10, 
}: TextAreaProps) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const [charCount, setCharCount] = useState(0);
  const [rowCount, setRowCount] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = event.target.value;

    if (maxCharCount && value.length > maxCharCount) {
      value = value.slice(0, maxCharCount);
    }

    // Calculate the current number of rows based on the new lines in the input
    const newRowCount = value.split("\n").length;

    if (newRowCount <= maxRows) {
      setRowCount(newRowCount);
      setValue(source, value); // Update the form value
      setCharCount(value.length);
    } else {
      // Prevent input if max rows exceeded
      event.preventDefault();
    }
  };

  // Determine the color based on how close the charCount is to the maxCharCount
  const getCharCountColor = () => {
    if (!maxCharCount) return "text-gray-500";
    const ratio = charCount / maxCharCount;
    if (ratio > 0.9) return "text-red-500"; 
    if (ratio > 0.75) return "text-orange-500"; 
    if (ratio > 0.5) return "text-yellow-500";
    return "text-gray-500"; 
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 text-left text-sm font-semibold">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <textarea
        {...register(source, {
          required: required ? `${label} is required` : false,
          maxLength: maxCharCount
            ? {
                value: maxCharCount,
                message: `Maximum character count is ${maxCharCount}`,
              }
            : undefined,
        })}
        rows={rows}
        className={`input-field block w-full border rounded-md p-2 focus:outline-none ${
          errors[source]
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-blue-800"
        }`}
        onChange={handleInputChange}
      />
      {maxCharCount && (
        <p className={`text-sm mt-1 text-left ${getCharCountColor()}`}>
          {charCount}/{maxCharCount} characters
        </p>
      )}
      <p className="text-sm mt-1 text-left text-gray-500">
        {rowCount}/{maxRows} rows
      </p>
      {helperText && !errors[source] && (
        <p className="text-gray-500 text-sm mt-1 text-left">{helperText}</p>
      )}
      {errors[source] && (
        <p className="text-red-500 text-sm mt-1 text-left">{`${errors[source]?.message}*`}</p>
      )}
    </div>
  );
};

export { TextAreaInput };