import React from "react";

interface FormLabelProps {
  name: string;
  label: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ name, label }) => {
  return (
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
  );
};

export default FormLabel;
