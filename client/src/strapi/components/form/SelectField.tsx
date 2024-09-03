/* eslint-disable @typescript-eslint/no-explicit-any */
import { useField, useFormikContext } from 'formik';
import React from 'react'

const SelectField = ({ ...props }: any) => {
    const [field] = useField(props.name);
    const { setFieldValue } = useFormikContext<any>();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;

        if (selectedValue === "Choose here") {
            setFieldValue(props.name, '');
        } else {
            setFieldValue(props.name, selectedValue);
        }
    };

    return (
        <select
            {
            ...props
            }
            {
            ...field
            }
            onChange={handleChange}
            className="input-text"
        >
            <option disabled selected>Choose here</option>

            {

                props?.rules?.options?.map((item: any) => (
                    <option key={item.value}>{item.label}</option>
                ))
            }
        </select>
    )
}

export default SelectField
