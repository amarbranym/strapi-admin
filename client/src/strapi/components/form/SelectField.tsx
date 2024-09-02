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
            className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none"
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
