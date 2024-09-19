/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { useField, useFormikContext } from 'formik';
import Button from '../../ui/Button';
import CheveronDownIcon from '../../ui/icons/CheveronDownIcon';
import { apiFetch } from '../../utils/service';
import { useStrapiContext } from '../../providers/StrapiAdmin';



const StrapiField = ({ ...props }: any) => {
    const [field, meta] = useField(props.name)
    const { setFieldValue } = useFormikContext<any>();
    const { baseURL } = useStrapiContext()
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [values, setValues] = useState<any[]>([]);

    useEffect(() => {
        setFieldValue(props.name, props?.multiple ? [] : null);
    }, [])

    useEffect(() => {
        if (meta.value) {
            if (!props.multiple) {
                setSearchValue(meta?.value.label)
            }
        }
    }, [props.name, meta.value, props.multiple])



    const handleGetDocument = async () => {
        const url = `${props.rules.model}?_q=${searchValue}`;
        const data = await apiFetch(baseURL + `/${url}`);
        const options = data?.data?.map((item: any) => ({
            label: item.attributes[props.rules.field],
            value: item.attributes[props.rules.field],
            id: item.id
        })) || [];
        setValues(options);
    }

    useEffect(() => {
        handleGetDocument()
    }, [searchValue]);

    const inputRef = useRef<any>(null);

    const handleInputClick = () => {
        setShowMenu(prev => !prev);
    };

    useEffect(() => {
        const handler = (e: any) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    }, []);

    const isSelected = (option: any) => {
        if (!meta.value) return false;
        return props?.multiple
            ? meta.value.some((val: any) => val.value === option.value)
            : meta.value.value === option.value;
    };

    const onItemClick = (option: any) => {
        let newValue;
        if (props?.multiple) {
            if (meta.value.some((val: any) => val.id === option.id)) {
                setShowMenu(false)
                return; // Do nothing if the option is already selected
            } else {
                newValue = [...meta.value, option];
            }
        } else {
            newValue = option;
        }

        setFieldValue(props.name, newValue);
        setSearchValue(props?.multiple ? "" : option.label);
        setShowMenu(false);
    };

    const onTagRemove = (e: any, option: any) => {
        e.stopPropagation();
        setFieldValue(props.name, meta.value.filter((val: any) => val.id !== option.id));
    };

    const handleSave = async () => {
        const payload = { [props.rules.field]: searchValue }


        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: payload }),
            credentials: 'include',
        };
        await apiFetch(baseURL + `/${props.rules.model}`, options)
        // await createDocumentOption({
        //     data: { [props.rules.field]: searchValue },
        //     model: props.rules.model
        // });
    };

    return (
        <div ref={inputRef} className='relative'>

            {
                props?.multiple && (
                    <div className='flex gap-2 mb-2 flex-wrap'>
                        {
                            meta?.value?.map((tag: any, index: any) => (
                                <span key={index} className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                    {tag.label}
                                    <button onClick={(e) => onTagRemove(e, tag)} type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                                            <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                    </button>
                                </span>
                            ))
                        }
                    </div>
                )
            }

            <div className="relative  rounded-md shadow-sm" onClick={handleInputClick}>

                <input
                    {...field}
                    type="text"
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    value={searchValue}
                    className="block w-full px-4 rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                />

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <CheveronDownIcon className="h-5 w-5  text-gray-400" />
                </div>

            </div>

            {showMenu &&
                <ul role="list" className=" w-full   max-h-[20rem] overflow-y-auto absolute z-40 mt-2  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >  
                    {
                        values?.length > 0 ? values?.map((item: any, index: any) => (
                            <li key={index + 1} onClick={() => onItemClick(item)} className={` hover:bg-gray-100 cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 ${isSelected(item) && "bg-gray-100"}`}>{item.label}</li>

                        )) :
                            <li onClick={handleSave} className=" text-center  cursor-pointer block px-4 py-8 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                <Button size='md' bg='white' type='button'  >add item</Button>
                            </li>
                    }

                </ul>
            }

        </div >
    )
}

export default React.memo(StrapiField)
