/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FormData } from '../../example';
import { apiFetch, populateData } from '../utils/service';
import { useStrapiContext } from './StrapiAdmin';
interface StrapiFormContextProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleData: any;
  isLoading?: boolean;
  submit?: () => void;
  setSchema: React.Dispatch<React.SetStateAction<any>>;
}

const StrapiFormContext = createContext<StrapiFormContextProps | undefined>(undefined);

export const StrapiFormProvider: React.FC<{
  children: (props: { submit: () => void; isLoading?: boolean }) => React.ReactNode;
  submit?: (result: { data: any; success: boolean }) => void;
  collectionName: string;
  slug?: string;
  query?: string;
}> = ({ children, collectionName, slug, query }) => {

  const [data, setData] = useState<any>({});
  const {baseURL} = useStrapiContext()
  const handleData = (key: string, values: any) => {
    setData((prevData: any) => ({ ...prevData, [key]: values }));
  };

  const [schemaFields, setSchemaFields] = useState<any[]>([]);

  const setSchema = (obj: any) => {
    const _arr: any[] = schemaFields;
    _arr.push(obj)
    setSchemaFields(_arr)
  }

  const handleGetDocument = async () => {
    const result = await apiFetch(baseURL + 
      `/${collectionName}/${slug}?${query}`);
    const poulateResult = populateData(schemaFields, result?.data?.attributes);
    setData(poulateResult)
  }


  useEffect(() => {
    if (slug) {
      handleGetDocument()
    }
  }, [slug])

  const handleSubmit = async () => {
    let isValid: boolean = false
    const transformData = (schema: FormData[], name: string, data: any) => {
      const obj: any = {}
      for (let index = 0; index < schema.length; index++) {
        const field: FormData = schema[index];

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
      const options = {
        method: slug ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: submissionData }),
        credentials: 'include',
      };
      const url = slug ? `${collectionName}/${slug}` : `${collectionName}`
      await apiFetch(baseURL + 
        `/${url}`,
        options
      );
    } else {
      isValid = false
    }
  }


  return (
    <StrapiFormContext.Provider value={{ data, setData, handleData, setSchema, submit: handleSubmit }}>
      {children({ submit: handleSubmit })}
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
