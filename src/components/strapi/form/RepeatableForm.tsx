/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import FormField from './FormField';
import * as Yup from 'yup';
import Button from '../../ui/Button';
import DeleteIcon from '../../ui/icons/DeleteIcon';
import PlusIcon from '../../ui/icons/PlusIcon';
import { useStrapiFormContext } from '../../providers/StrapiFormProvider';
import EyeIcons from '../../ui/icons/EyeIcons';

interface RepeatableFormProps {
    fieldsSchema: any;
    name: string;
    type?: string
}

const RepeatableForm: React.FC<RepeatableFormProps> = ({ fieldsSchema, name = "", type = "experience" }) => {
    const { setSchema, data, handleData } = useStrapiFormContext();

    const formValue = Object.hasOwn(data, name) ? data[name] : []
    const [expanded, setExpanded] = useState<string | false>();
    const validationSchemaFields: { [key: string]: any } = {};
    const initialValues: { [key: string]: string } = {};

    fieldsSchema.forEach((field: any) => {
        initialValues[field.name] = '';
        if (field?.required) {
            validationSchemaFields[`${field.name}`] = Yup.string().required(`${field.label || field.name} is required`);
        }
    });
    useEffect(() => {
        setSchema({ type, schema: fieldsSchema, name })
    }, [fieldsSchema, name])
    const validationSchema = Yup.object().shape(validationSchemaFields);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };


    const addForm = () => {
        const uniqueId = uuidv4();
        handleData(name,[...formValue, { id: uniqueId, ...initialValues }]);
        setExpanded(uniqueId)
    };

    const handleFormSubmit = (values: any, id: string) => {
        handleData(name,formValue?.map((edu: any) => {
            if (edu.id === id) {
                return { ...edu, ...values };
            }
            return edu;
        }));
        setExpanded(false)
    };

    const removeForm = (id: string) => {
        handleData(name,formValue.filter((edu: any) => edu.id !== id));
    };


    return (
        <div className='border mt-6 rounded-md px-6'>
            <div className='py-4 text-xl'>
                <h1>{name}</h1>
            </div>

            <div className='flex flex-col gap-2   '>
                {formValue?.map((val: any, index: any) => (
                    <div key={val.id}>
                        <Accordion expanded={expanded === val.id} onChange={handleChange(val.id)} sx={{ boxShadow: "none", paddingY: "0px", border: "1px solid #dcd8d8" }}>
                            <AccordionSummary sx={{ borderRadius: "10px", display: expanded === val.id ? "none" : "flex", justifyContent: "space-between", alignItems: "center" }} >

                                <h4 className=' w-full text-sm  block '>
                                    <span className='mr-2'>{index + 1}.</span>   {val?.id}
                                </h4>
                                <EyeIcons className='size-6 ' />

                            </AccordionSummary>
                            <AccordionDetails>
                                <Formik
                                    initialValues={val}
                                    onSubmit={(values) => handleFormSubmit(values, val.id)}
                                    validationSchema={validationSchema}
                                >

                                    <Form className="grid gap-4 grid-flow-row-dense grid-cols-12 grid-rows-2">
                                        {fieldsSchema.map((field: any, index: any) => (
                                            <FormField key={index} {...field} />
                                        ))}
                                        <div className=' col-span-12 flex justify-between  '>
                                            <div>
                                                <Button type='submit' bg='solid' size='sm'  >
                                                    Save
                                                </Button>
                                            </div>
                                            <button type='button' onClick={() => removeForm(val.id)}>
                                                <DeleteIcon className='size-6' />

                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ))}
            </div>
            <div className='py-2 '>
                <button type='button' className=" py-2 !flex gap-1 items-center mx-auto text-blue-400" onClick={addForm}>
                    <PlusIcon className="size-6" /> add {name}
                </button>
            </div>
        </div>
    );
};

export default RepeatableForm;
