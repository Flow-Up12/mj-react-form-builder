import { useState } from 'react';
import { ContactArrayInput } from './components/ContactArrayInput';
import { TextInput } from './components/TextInput';
import { useFormContext } from 'react-hook-form';
import { FormSection } from './components/FormSection';
import { SelectInput } from './components/SelectInput';
import { AutoCompleteInput } from './components/AutocompleteInput';
import { NumberInput } from './components/NumberInput';

const Test = () => {
  const { trigger, formState: {errors}, getValues} = useFormContext();
  const [showSelectInput, setShowSelectInput] = useState(false);
  
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <p className="text-red-600 text-xs md:text-sm text-left py-2">
        Fields marked with * are required
      </p>
      <p className="text-md text-center mb-4">
        Annual Dues = $90.00 membership fee + $0.90 per connection (Maximum: $4,000)
      </p>
      <TextInput source="name" label="Name" required />
      
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={(e) => {
          e.preventDefault();
          trigger();
          console.log(errors);
          console.log(getValues());
        }}
      >
        Submit
      </button>

      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        onClick={(e) => {
          e.preventDefault();
          setShowSelectInput((prev) => !prev)
        }}
      >
        {showSelectInput ? 'Hide' : 'Show'} Select Input
      </button>

      <FormSection title="System Contacts">
        <NumberInput
          source="number"
          label="Number"
          required
          min={0}
          max={100}
          maxLength={3}
          helperText="Enter a number"
        />
        
        <AutoCompleteInput
          source="name"
          label="Name"
          required
          options={[
            { value: '1', label: 'Primary' },
            { value: '2', label: 'Secondary' },
            { value: '3', label: 'Billing' },
            { value: '4', label: 'Technical' },
            { value: '5', label: 'Emergency' },
          ]}
        />

        {showSelectInput && (
          <SelectInput
            onChange={(e) => {
              console.log(e);
            }}
            source="type"
            label="How would you like to receive the ORWA Membership Directory?"
            required
            options={[
              { value: 'Primary', label: 'Primary' },
              { value: 'Secondary', label: 'Secondary' },
              { value: 'Billing', label: 'Billing' },
              { value: 'Technical', label: 'Technical' },
              { value: 'Emergency', label: 'Emergency' },
            ]}
          />
        )}

        <ContactArrayInput isArray source="contacts" label="Contacts" />
      </FormSection>
    </div>
  );
};

export default Test;