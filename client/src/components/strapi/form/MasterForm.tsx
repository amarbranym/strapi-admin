/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import BasicForm from './BasicForm';
import { personalSchema, AddressSchema } from '../../../example';

const MasterForm = () => {
    
    return (
        <>
        <BasicForm fieldsSchema={personalSchema} name="personalDetails" />
        <BasicForm fieldsSchema={AddressSchema} name="Address" type='Component' />
        </>

    )
}

export default MasterForm
