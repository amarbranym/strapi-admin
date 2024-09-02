/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseButton, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import React, { useState } from 'react'
import { useStrapiListContext } from '../../providers/StrapiListProvider'
import { filterOprators } from '../../../example'
import { v4 as uuidv4 } from 'uuid';

interface FiltersProps {
    fieldSchema?: any[]
}
const Filters: React.FC<FiltersProps> = ({ fieldSchema }) => {
    const { filterQuery = [], setFilterQuery = () => { } } = useStrapiListContext()
    const [selectedField, setSelectedField] = useState<any>({});

    const fields = fieldSchema?.filter((item) => ["text", "textarea", "email", "ref:strapi", "number", "date", "select"].includes(item.type))


    const [queryData, setQueryData] = useState<any>({
        operatorFields: "",
        operator: ""
    })


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "operatorFields") {
            setSelectedField(JSON.parse(value))
            setQueryData({ ...queryData, [name]: JSON.parse(value).name })
        } else if (name === "operator") {
            setQueryData({ ...queryData, [name]: JSON.parse(value).value, "operatorName": JSON.parse(value).label })

        } else {
            setQueryData({ ...queryData, [name]: value })
        }

    };

    const handleAddFilter = () => {
        const id = uuidv4()
        if (setFilterQuery) {
            setFilterQuery([...filterQuery, { id, ...queryData }]);
        }
        setQueryData({})
    };

    const handleRemove = (id: string) => {
        setFilterQuery((prevFilterQuery: any) =>
            prevFilterQuery.filter((item: any) => item.id !== id)
        );
    };


    return (
        <Popover className=" relative">
            <div className='flex gap-2'>
                <PopoverButton className=" text-sm font-semibold px-4 py-1 bg-white border rounded-md">Filters</PopoverButton>
                <div className='w-[90%]'>
                    {
                        filterQuery.map((item: any, index: number) => (
                            <span key={item.id || index} className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10" >{`${item.operatorFields} ${item.operatorName}`}
                                <button onClick={() => handleRemove(item.id)} type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
                                    <span className="sr-only">Remove</span>
                                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                                        <path d="M4 4l6 6m0-6l-6 6" />
                                    </svg>
                                    <span className="absolute -inset-1" />
                                </button></span>
                        ))
                    }

                </div>
            </div>
            <PopoverPanel anchor="bottom" className=" w-[250px] mt-2 ml-[5.5rem] border p-2 bg-white rounded-md  " >
                <div className=' flex flex-col gap-2'>
                    <select onChange={handleChange} name='operatorFields' className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none">
                        <option disabled selected>Choose Field</option>
                        {
                            fields?.map((item: any, index: number) => (
                                <option key={index} value={JSON.stringify(item)}>{item.label}</option>
                            ))
                        }

                    </select>

                    {
                        <select name='operator' className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none" onChange={handleChange}>
                            <option disabled selected>Choose Operator</option>
                            {
                                filterOprators?.filter(item => item?.fieldTypes?.includes(selectedField.type)).map((item: any, index: number) => (
                                    <option key={index} value={JSON.stringify(item)}>{item.label}</option>
                                ))
                            }
                        </select>
                    }

                    <>{(queryData["operator"] && queryData["operatorFields"]) && <>
                        {
                            selectedField.type === "select" ? <select name='text' className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none" onChange={handleChange} >
                                <option disabled selected>Choose Value</option>
                                {
                                    selectedField?.rules?.options?.map((item: any, index: any) => (
                                        <option key={index} value={item.label}>{item.label}</option>
                                    ))
                                }
                            </select> : <input name='text' onChange={handleChange} className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none" type={["text", "ref:strapi", "email", "textareat"].includes(selectedField.type) ? "text" : selectedField.type} />
                        }
                    </>}</>

                    {(queryData["operator"] && queryData["operatorFields"] && queryData?.text) && <div>
                        <CloseButton onClick={handleAddFilter} className='w-full text-blue-600 bg-blue-50 py-1 border border-blue-600 rounded-md hover:bg-white' >Add filter</CloseButton>
                    </div>}

                </div>
            </PopoverPanel>
        </Popover>
    )
}

export default Filters
