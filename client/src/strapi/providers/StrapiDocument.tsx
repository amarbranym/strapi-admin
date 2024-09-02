/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useGetDocumentListMutation, useGetDocumentQuery } from '../redux/api/apiSlice';

interface StrapiDocumentContextProps {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
    isLoading: boolean;

}

const StrapiDocumentContext = createContext<StrapiDocumentContextProps | undefined>(undefined);

export const StrapiDocument: React.FC<{ children:(props:{data:any[]})=> ReactNode, collectionName?: string, query?: string, slug: string }> = ({ children, collectionName, query, slug }) => {
    const [data, setData] = useState<any>({});

    const { data: documentData, isLoading } = useGetDocumentQuery({ collectionName, id: slug!, populateQuery: query }, {
        skip: !slug,  // Skip the API call if slug is not provided
    });


    useEffect(() => { setData(documentData?.data) }, [documentData])

    return (
        <StrapiDocumentContext.Provider value={{ data, setData, isLoading }}>
            {children({data})}
        </StrapiDocumentContext.Provider>
    );
};

export const useStrapiDocumentContext = () => {
    const context = useContext(StrapiDocumentContext);
    if (context === undefined) {
        throw new Error('useStrapiDocumentContext must be used within a StrapiDocumentProvider');
    }
    return context;
};
