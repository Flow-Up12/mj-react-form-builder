import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextInput } from "./TextInput";
import { MaskedPhoneInput } from "./MaskedPhoneInput";
import { useFieldArray, useFormContext } from "react-hook-form";

interface ContactArrayProps {
  source: string;
  isArray?: boolean;
  label: string;
  helperText?: string;
  required?: boolean;
}

export const ContactArrayInput = ({
  source,
  isArray = false,
  label,
  helperText,
  required = false,
}: ContactArrayProps) => {
  const { control, setValue, watch } = useFormContext();
  const [anonymousEmails, setAnonymousEmails] = useState<{
    [key: string]: boolean;
  }>({});

  const handleAnonymousEmail = (path: string, isChecked: boolean) => {
    const firstName = watch(`${path}.first`);
    const lastName = watch(`${path}.last`);

    setAnonymousEmails((prev) => ({
      ...prev,
      [path]: isChecked,
    }));

    if (isChecked) {
      setValue(`${path}.email`, `anonymous+${firstName}${lastName}@orwa.org`);
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
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <p className="text-left text-lg font-semibold">{label}</p>
          <button
            type="button"
            onClick={() =>
              append({ first: "", last: "", email: "", phone: "" })
            }
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Add Contact
          </button>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative border border-gray-300 shadow-sm p-6 rounded-lg bg-white"
            >
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white pb-1 px-3 rounded-md hover:bg-red-600 transition align-middle"
              >
                <DeleteIcon fontSize="small" />
              </button>
              <div className="grid grid-cols-1 gap-4">
                <TextInput
                  source={`${source}[${index}].first`}
                  label="First Name"
                  required={required}
                />
                <TextInput
                  source={`${source}[${index}].last`}
                  label="Last Name"
                  required={required}
                />
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id={`anonymous-email-${index}`}
                  onChange={(e) =>
                    handleAnonymousEmail(
                      `${source}[${index}]`,
                      e.target.checked
                    )
                  }
                  className="mr-2"
                />
                <label
                  htmlFor={`anonymous-email-${index}`}
                  className="text-sm text-gray-600"
                >
                  Don&apos;t have an email
                </label>
              </div>
              {!anonymousEmails[`${source}[${index}]`] && (
                <TextInput
                  source={`${source}[${index}].email`}
                  label="Email"
                  type="email"
                  required={required}
                />
              )}
              <MaskedPhoneInput
                source={`${source}[${index}].phone`}
                required={required}
              />
              <TextInput source={`${source}[${index}].title`} label="Title" />
            </div>
          ))}
        </div>
        {helperText && (
          <p className="text-sm text-gray-500 text-left mt-4">{helperText}</p>
        )}
      </div>
    );
  } else {
    return (
      <div className="p-6 border border-gray-300 shadow-sm rounded-lg bg-white">
        <p className="text-left text-lg font-semibold">{label}</p>
        <hr className="my-2" />
        <TextInput
          source={`${source}.first`}
          label="First Name"
          required={required}
        />
        <TextInput
          source={`${source}.last`}
          label="Last Name"
          required={required}
        />
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="anonymous-email"
            onChange={(e) => handleAnonymousEmail(source, e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="anonymous-email" className="text-sm text-gray-600">
            Don&apos;t have an email
          </label>
        </div>
        {!anonymousEmails[source] && (
          <TextInput
            source={`${source}.email`}
            label="Email"
            type="email"
            required={required}
          />
        )}
        <MaskedPhoneInput source={`${source}.phone`} required={required} />
        <TextInput source={`${source}.title`} label="Title" />
        <p className="text-sm text-gray-500 text-left mt-2">{helperText}</p>
      </div>
    );
  }
};
