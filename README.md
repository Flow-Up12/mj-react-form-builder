Here's a `README.md` file that outlines how to use your `mj-react-form-builder` package:

---

# MJ React Form Builder

`mj-react-form-builder` is a customizable and reusable form component library built with React, TypeScript, and Tailwind CSS. This package provides a suite of input components, layout components, and utility functions to help developers quickly build forms with validation and consistent styling.

## Features

- **Customizable Inputs**: Includes various input components like text inputs, multi-select, masked inputs, and more.
- **Form Layouts**: Use layout components like `FormSection` to organize form elements.
- **TypeScript Support**: Built with TypeScript for type safety and better development experience.
- **Tailwind CSS**: Preconfigured with Tailwind CSS for utility-first styling.
- **React Hook Form Integration**: Designed to work seamlessly with `react-hook-form` for powerful form validation and management.

## Installation

You can install the `mj-react-form-builder` package via npm:

```bash
npm install mj-react-form-builder
```

Or if you are using Yarn:

```bash
yarn add mj-react-form-builder
```

## Getting Started

To use the components in your project, import them from `mj-react-form-builder`:

```tsx
import React from "react";
import { Form, FormSection, TextInput } from "mj-react-form-builder";
import "./index.css"; // Ensure Tailwind CSS is loaded

const MyForm = () => {
  return (
    <Form>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Custom Form</h1>
        <FormSection title="User Information">
          <TextInput name="firstName" label="First Name" required />
          <TextInput name="lastName" label="Last Name" required />
          <TextInput name="email" label="Email" required />
        </FormSection>
      </div>
    </Form>
  );
};

export default MyForm;
```

### Example Components

- **TextInput**: A basic text input component with validation.
- **MultiSelectInput**: A multi-select dropdown component.
- **FormSection**: A layout component to organize form fields into sections.

### Available Components

- **Inputs**:
  - `CheckboxInput`
  - `ContactArrayInput`
  - `FileInput`
  - `MaskedPhoneInput`
  - `NumberInput`
  - `MultiSelectInput`
  - `ResponsiveListItem`
  - `SelectInput`
  - `TextInput`
  - `TextAreaInput`
  - `ZipCodeInput`
  - `SelectStateInput`

- **Layouts**:
  - `FormSection`

- **Providers**:
  - `NotifyProvider`
  - `Form`

- **Services**:
  - `uploadService`

## Tailwind CSS Setup

Ensure Tailwind CSS is set up in your project. The `index.css` file should include the following imports to make Tailwind CSS available globally:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## TypeScript Configuration

If you're expanding the ESLint configuration in a production application, we recommend updating the configuration to enable type-aware lint rules. 

### Example ESLint Configuration

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

### TypeScript Configuration

Your `tsconfig.json` should be properly set up to handle the library's types and to integrate seamlessly with your project:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

## Contributing

If you'd like to contribute to `mj-react-form-builder`, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This package is licensed under the MIT License.

## Author

Marcos Jimenez

---

This `README.md` should give users a clear overview of how to use your `mj-react-form-builder` package, including installation, basic usage, and configuration tips.