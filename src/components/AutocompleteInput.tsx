import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

interface AutoCompleteInputProps {
  source: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  helperText?: string;
  requiredMessage?: string;
  onChange?: (value: string) => void;
}

export const AutoCompleteInput = ({
  source,
  label,
  options,
  required = false,
  helperText,
  requiredMessage,
  onChange,
}: AutoCompleteInputProps) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState(getValues(source) ?? "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Register the input with react-hook-form
  useEffect(() => {
    register(source, {
      required: required ? `${label} ${requiredMessage ? requiredMessage : 'is required'}` : false,
    });
  }, [register, source, required, requiredMessage, label]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsOpen(true);
  };

  const handleOptionClick = (value: string, label: string) => {
    setValue(source, value);
    setInputValue(label);
    if (onChange) {
      onChange(value);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-6 relative" ref={dropdownRef}>
      <label className="block mb-1 text-left text-sm font-bold">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="text"
        value={inputValue}
        onClick={() => setIsOpen(true)}
        onChange={handleInputChange}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 ${
          errors[source]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
        placeholder={`Select ${label}`}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <div
              key={option.value + index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {helperText && !errors[source] && (
        <p className="text-gray-500 text-sm mt-1 text-left">{helperText}</p>
      )}
      {errors[source] && (
        <p className="text-red-500 text-sm mt-1 text-left">{`${errors[source]?.message}`}</p>
      )}
    </div>
  );
};