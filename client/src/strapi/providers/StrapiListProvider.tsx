/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useGetDocumentListMutation } from '../redux/api/apiSlice';

interface StrapiListContextProps {
    data: any[]; 
    setData: React.Dispatch<React.SetStateAction<any[]>>; 
    isLoading: boolean; 
    setFilterQuery?: React.Dispatch<React.SetStateAction<any[]>>; 
    filterQuery?: any[]; 
    setCurrentPage?: React.Dispatch<React.SetStateAction<number>>; 
    setTotalPage?: React.Dispatch<React.SetStateAction<number>>;
    currentPage?: number; 
    totalPage?: number;
}
const StrapiListContext = createContext<StrapiListContextProps | undefined>(undefined);

export const StrapiListProvider: React.FC<{ children: ReactNode, collectionName?: string, query?: string }> = ({ children, collectionName, query }) => {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [filterQuery, setFilterQuery] = useState<any[]>([])
    const [totalPage, setTotalPage] = useState<number>(1)

    const [getDocumentList, { isLoading }] = useGetDocumentListMutation()
    const handleGetDocument = async () => {
        try {
            const { data: list } = await getDocumentList({ collectionName, currentPage, filterQuery, populateQuery: query });
            setData(list?.data)
            setTotalPage(list?.meta?.pagination?.pageCount);
        } catch (err) {
            console.error('Error fetching candidate list:', err);
        }
    };

    useEffect(() => {
        handleGetDocument()
    }, [currentPage, filterQuery])

    return (
        <StrapiListContext.Provider value={{ data, setData, isLoading, setFilterQuery, setCurrentPage, currentPage, filterQuery, totalPage }}>
            {children}
        </StrapiListContext.Provider>
    );
};

export const useStrapiListContext = () => {
    const context = useContext(StrapiListContext);
    if (context === undefined) {
        throw new Error('useStrapiListContext must be used within a StrapiListProvider');
    }
    return context;
};
