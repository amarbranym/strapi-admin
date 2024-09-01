/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FormData } from '../../example';
import { populateData } from '../utils/Services';
// import { useCreateNewStudentMutation, useGetStudentQuery } from '../../redux/api/apiSlice';
const isLoading = false;
interface StrapiFormContextProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleData: any;
  isLoading: boolean;
  submit?: () => void;
  setSchema: React.Dispatch<React.SetStateAction<any>>;
}

const StrapiFormContext = createContext<StrapiFormContextProps | undefined>(undefined);

export const StrapiFormProvider: React.FC<{
  children: (props: { submit: () => void; isLoading: boolean }) => React.ReactNode;
  submit?: (result: { data: any; success: boolean }) => void;
  collectionName: string;
  slug?: string;
  query?: string;
}> = ({ children, collectionName, slug, query }) => {
  // const { data: studentData } = useGetStudentQuery({ collectionName, id: slug!, populateQuery: query }, {
  //   skip: !slug,  // Skip the API call if slug is not provided
  // });
  const [data, setData] = useState<any>({});
  // const [createNewStudent, [isLoading]] = useCreateNewStudentMutation()
  const handleData = (key: string, values: any) => {
    setData((prevData: any) => ({ ...prevData, [key]: values }));
  };

  const [schemaFields, setSchemaFields] = useState<any[]>([]);

  const setSchema = (obj: any) => {
    console.log(obj)
    const _arr: any[] = schemaFields;
    _arr.push(obj)
    setSchemaFields(_arr)
  }

  async function fetchGetData(slug: string) {
    const url = `http://localhost:1337/api/${collectionName}/${slug}?${query}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' as const,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const poulateResult = await populateData(schemaFields, result?.data?.attributes);
      setData(poulateResult)
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  useEffect(() => {
    if (slug) {
      fetchGetData(slug)
    }
  }, [slug])






  const handleSubmit = async () => {
    let isValid: boolean = false
    const transformData = (schema: FormData[], name: string, data: any) => {
      const obj: any = {}
      for (let index = 0; index < schema.length; index++) {
        const field: FormData = schema[index];

        // Check if required field is missing in data
        if (field.required) {
          if (!data[field?.name] || data[field?.name] === undefined || data[field?.name] === null || data[field?.name] === '') {
            isValid = true
          }
        }


        if (Object.hasOwn(data || {}, field?.name)) {
          if (field.type === "ref:strapi") {
            if (field?.multiple) {
              obj[`${field.name}`] = {
                connect: data[`${field.name}`]?.map((value: any) => ({ id: value["id"] }))
              }
            }
            else {
              obj[`${field.name}`] = {
                connect: [{ id: data[`${field.name}`]?.id }]
              }
            }
          }
          else {
            obj[`${field.name}`] = data[`${field.name}`]
          }
        }
        else {

        }
      }

      return obj;
    }

    var submissionData: any = {}

    schemaFields.map((value: any) => {
      const { schema = [], name = "", type }: { schema?: FormData[], type?: string, name?: string } = value
      if (type === "RepeatableComponent") {
        var newArr: any[] = []
        data[name]?.map((value: any) => {
          newArr.push(transformData(schema, name, value))
        })
        submissionData[name] = newArr
      }
      else if (type === "Component") {
        submissionData[name] = transformData(schema, name, data[name])
      }
      else if (type === "Basic") {
        submissionData = { ...submissionData, ...transformData(schema, name, data[name]) }
      }
    });

    if (isValid === false) {
      // await createNewStudent({ collectionName, id: slug, data: submissionData })
      try {
        const url = `http://localhost:1337/api/${collectionName}${slug ? `/${slug}` : ""}`
        const response = await fetch(url, {
          method: slug ? "PUT" : 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include' as const,
          body: JSON.stringify({ data: submissionData }),
        });
        await response.json();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      isValid = false
    }
  }



  return (
    <StrapiFormContext.Provider value={{ data, setData, handleData, isLoading, setSchema, submit: handleSubmit }}>
      {children({ submit: handleSubmit, isLoading })}
    </StrapiFormContext.Provider>
  );
};

export const useStrapiFormContext = () => {
  const context = useContext(StrapiFormContext);
  if (context === undefined) {
    throw new Error('useStrapiFormContext must be used within a StrapiFormProvider');
  }
  return context;
};
