/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { apiFetch } from '../utils/service';
import { useStrapiContext } from './StrapiAdmin';

interface StrapiListContextProps {
    data: any[];
    setData: React.Dispatch<React.SetStateAction<any[]>>;
    isLoading?: boolean;
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
    const {baseURL} = useStrapiContext()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [filterQuery, setFilterQuery] = useState<any[]>([])
    const [totalPage, setTotalPage] = useState<number>(1)

    const handleGetDocument = async () => {
        try {
            const filterParams = filterQuery
                .map(
                    (q) =>
                        `&filters[${q.operatorFields}][${q.operator}]${q.text ? `=${q.text}` : ''}`
                )
                .join('');

            const list = await apiFetch(baseURL + 
                `/${collectionName}?${query}&pagination[page]=${currentPage}&pagination[pageSize]=6${filterParams}`
            );

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
        <StrapiListContext.Provider value={{ data, setData, setFilterQuery, setCurrentPage, currentPage, filterQuery, totalPage }}>
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
