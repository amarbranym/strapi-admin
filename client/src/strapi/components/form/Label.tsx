import React from "react";

interface FormLabelProps {
  name: string;
  label: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ name, label }) => {
  return (
    <label
      htmlFor={name}
      className="label"
    >
      {label}
    </label>
  );
};

export default FormLabel;
