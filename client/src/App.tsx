/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { StrapiFormProvider } from './strapi/providers/StrapiFormProvider';
import { Container } from './strapi/ui/Container';
import BasicForm from './strapi/components/form/BasicForm';
import { AddressSchema, personalSchema, experienceSchema, ContactSchema, qualificationSchema, otherDetailSchema } from './example';
import RepeatableForm from './strapi/components/form/RepeatableForm';
import StrapiList from './strapi/components/list/StrapiList';
import Card from './strapi/components/list/Card';
import Empty from './strapi/components/list/Empty';
import Filters from './strapi/components/list/Filters';
import Pagination from './strapi/components/list/Pagination';
import { StrapiAdmin } from './strapi/providers/StrapiAdmin';


const App = () => {

  return (
    <StrapiAdmin baseURL='http://localhost:1337/api'>
      <Container className='my-10'>

        <StrapiFormProvider
          collectionName="students"
          // slug="58"
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



        {/* table  */}
        <StrapiList collectionName='students' query="populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference" >
          <Filters fieldSchema={[...personalSchema, ...otherDetailSchema]} />
          <Card
            className="your-class-name"
            renderItem={(item) => (
              <li key={item.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-auto">
                    {/* <img alt="" src={item.imageUrl} className="flex-none rounded-full" /> */}
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{item?.FirstName} {item.LastName}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item?.Email}</p>
                  </div>
                </div>
              </li>
            )}
          />
          <Empty>
            <div>
              no data found
            </div>
          </Empty>
          <Pagination />
        </StrapiList>
      </Container>
    </StrapiAdmin>
  );
}

export default App;
