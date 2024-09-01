import React from 'react';
import { TextInput } from './TextInput';

interface ZipCodeInputProps {
  source: string;
}

export const ZipCodeInput: React.FC<ZipCodeInputProps> = ({ source }) => {
  const transformZipCodeInput = (value: string) => {
    return value.replace(/[^\d]/g, ''); // Remove non-digit characters
  };

  return (
    <TextInput
      label="ZIP Code"
      transformInput={transformZipCodeInput}
      source={source}
      required
      maxLength={5}
    />
  );
};