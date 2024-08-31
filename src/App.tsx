import React from 'react';
import { StrapiFormProvider } from './components/providers/StrapiFormProvider';
import { Container } from './components/ui/Container';
import BasicForm from './components/strapi/form/BasicForm';
import { AddressSchema, personalSchema, experienceSchema, ContactSchema, qualificationSchema, otherDetailSchema } from './example';
import RepeatableForm from './components/strapi/form/RepeatableForm';

const App = () => {
  return (
    <Container className='my-10'>
      <StrapiFormProvider
        collectionName="students"
        slug="56"
        query="populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference"
      >
        {({ submit }) => (
          <>
            <BasicForm fieldsSchema={personalSchema} name="personalDetails" />
            <BasicForm fieldsSchema={AddressSchema} name="Address" type='Component' />
            <RepeatableForm fieldsSchema={ContactSchema} name="Contacts" />
            <RepeatableForm fieldsSchema={experienceSchema} name="experience" />
            <RepeatableForm fieldsSchema={qualificationSchema} name="qualification" />
            <BasicForm fieldsSchema={otherDetailSchema} name="otherDetails" />
            <button className='mt-4 p-2 bg-blue-600 text-white rounded-md' type='submit' onClick={submit}>submit</button>
          </>
        )}
      </StrapiFormProvider>
    </Container>
  );
}

export default App;
