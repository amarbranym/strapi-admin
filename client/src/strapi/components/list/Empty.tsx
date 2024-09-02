import React from 'react';
import { useStrapiListContext } from '../../providers/StrapiListProvider';
interface EmptyProps {
    className?: string;
    children: React.ReactNode;
}
const Empty: React.FC<EmptyProps> = ({ children }) => {
    const { data } = useStrapiListContext();

    if (!data || data.length === 0) {
        return (
            <div>
                {children}
            </div>
        );
    }

    return null; // Don't render anything if there's data
};

export default Empty;
