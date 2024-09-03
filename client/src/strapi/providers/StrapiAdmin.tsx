import React, { createContext, useContext, ReactNode } from 'react';

interface StrapiContextProps {
    baseURL: string;
    apiKey: string;
}

const StrapiContext = createContext<StrapiContextProps | undefined>(undefined);

export const StrapiAdmin: React.FC<{ children: ReactNode, baseURL?: string, apiKey?: string }> = ({ children, baseURL = "http://localhost:1337/api", apiKey = "" }) => {

    return (

        <StrapiContext.Provider value={{ baseURL, apiKey }}>
                {children}
        </StrapiContext.Provider>
    );
};

export const useStrapiContext = () => {
    const context = useContext(StrapiContext);
    if (context === undefined) {
        throw new Error('useStrapiContext must be used within a StrapiAdmin provider');
    }
    return context;
};
