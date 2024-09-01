import { useFieldArray, useFormContext } from "react-hook-form";
import { useState } from "react";
import { TextInput } from "./TextInput";
import {MaskedPhoneInput} from "./MaskedPhoneInput";

interface ContactArrayProps {
  source: string;
  isArray?: boolean;
  label: string;
  helperText?: string;
}

export const ContactArrayInput = ({
  source,
  isArray = false,
  label,
  helperText,
}: ContactArrayProps) => {
  const { control, setValue, watch } = useFormContext();
  const [anonymousEmails, setAnonymousEmails] = useState<{ [key: string]: boolean }>({});

  const handleAnonymousEmail = (path: string, isChecked: boolean) => {
    const firstName = watch(`${path}.first`);
    const lastName = watch(`${path}.last`);

    setAnonymousEmails((prev) => ({
      ...prev,
      [path]: isChecked,
    }));

    if (isChecked) {
      setValue(
        `${path}.email`,
        `anonymous+${firstName}${lastName}@orwa.org`
      );
    } else {
      setValue(`${path}.email`, "");
    }
  };

  if (isArray) {
    const { fields, append, remove } = useFieldArray({
      control,
      name: source,
    });

    return (
      <div>
        <p className="text-left text-lg font-semibold">{label}</p>
        <hr className="my-4 text-black bg-black" />
        {fields.map((field, index) => (
          <div key={field.id} className="border p-4 mb-4 rounded-md">
            <TextInput
              source={`${source}[${index}].first`}
              label="First source"
              required
            />
            <TextInput
              source={`${source}[${index}].last`}
              label="Last source"
              required
            />
            <div className="flex just">
              <input
                type="checkbox"
                id={`anonymous-email-${index}`}
                onChange={(e) => handleAnonymousEmail(`${source}[${index}]`, e.target.checked)}
              />
              <label htmlFor={`anonymous-email-${index}`} className="ml-2">
                Don't have an email
              </label>
            </div>
            {!anonymousEmails[`${source}[${index}]`] && (
              <TextInput
                source={`${source}[${index}].email`}
                label="Email"
                type="email"
                required
              />
            )}
            <MaskedPhoneInput source={`${source}[${index}].phone`} />
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 bg-red-500 text-white p-2 rounded-md"
            >
              Remove Contact
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ first: "", last: "", email: "", phone: "" })}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Add Contact
        </button>
        <p className="text-sm text-gray-500 text-left">{helperText}</p>
      </div>
    );
  } else {
    return (
      <div className="p-4 mb-4 rounded-md">
        <p className="text-left text-lg font-semibold">{label}</p>
        <hr className="my-2" />
        <TextInput source={`${source}.first`} label="First source" required />
        <TextInput source={`${source}.last`} label="Last source" required />
        <div className="flex items-center">
          <input
            type="checkbox"
            id="anonymous-email"
            onChange={(e) =>
              handleAnonymousEmail(source, e.target.checked)
            }
          />
          <label htmlFor="anonymous-email" className="ml-2">
            Don't have an email
          </label>
        </div>
        {!anonymousEmails[source] && (
          <TextInput
            source={`${source}.email`}
            label="Email"
            type="email"
            required
          />
        )}
        <MaskedPhoneInput source={`${source}.phone`} />
        <TextInput source={`${source}.title`} label="Title" required />
        <p className="text-sm text-gray-500 text-left">{helperText}</p>
      </div>
    );
  }
};