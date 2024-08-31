/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Field, useField } from "formik";
import SelectField from "./SelectField";
import StrapiField from "./StrapiField";

const Form_Input = ({ ...props }:any) => {
  const [field, meta] = useField(props?.name);
  return (
    <>
      {["text", "number", "date"].includes(props?.type) && (<><Field
        {...field}
        {...props}
        className="input-text"
      />
        {
          meta.touched && meta.error && <div className="text-red-500 text-sm mt-1">{meta.error}</div>
        }</>)

      }


      {["email"].includes(props.type) && (
        <div className="relative  rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {/* <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-gray-400" /> */}
          </div>
          <Field
            {...field}
            {...props}
            placeholder="you@example.com"
            className="input-email"
          />
        </div>)
      }



      {
        ["textarea"].includes(props.type) && <textarea
          {...props}
          {...field}
          className="input-text"
        />
      }


      {
        ["select"].includes(props.type) && (<><SelectField {...props} /> {
          meta.touched && meta.error && <div className="text-red-500 text-sm mt-1">{meta.error}</div>
        } </>)

      }
       {
        ["ref:strapi"].includes(props.type) && (
          <StrapiField
            {
            ...props
            }
          />
        )
      }

    </>
  );
};

export default Form_Input;
