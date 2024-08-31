import React from "react";
import FormLabel from "./Label";
import Fields from "./Fields";

interface Props {
  label: string;
  name: string;
  cols: number | string;
  row: number;
}

const FormFields: React.FC<Props> = ({ label, cols, row, name, ...props }) => {
  return (
    <div className={`col-span-${cols} row-span-${row} my-auto`}>
      <FormLabel label={label} name={name} />
      <Fields name={name} {...props} />
    </div>
  );
};

export default FormFields;
