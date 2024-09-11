import React from 'react'
import { ContactArrayInput } from './components/ContactArrayInput'
import { TextInput } from './components/TextInput'
import { useFormContext } from 'react-hook-form'
import { FormSection } from './components/FormSection'

const Test = () => {

  const {trigger} = useFormContext()

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
    <p className="text-red-600 text-xs md:text-sm text-left py-2">
      Fields marked with * are required
    </p>
    {/* Annual Dues = $90.00 membership fee + $0.90 per connection (Maximum: $4,000) */}
    <p className="text-md text-center mb-4">
      Annual Dues = $90.00 membership fee + $0.90 per connection (Maximum:
      $4,000)
    </p>
    <TextInput source="name" label="Name" required  />
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      onClick={(e) => {
        e.preventDefault()
        trigger()
      }}
    >
      Submit
    </button>

    <FormSection title="System Contacts">
          <ContactArrayInput isArray source="contacts" label="Contacts" />
      </FormSection>
  </div>
  )
}

export default Test
