/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useStrapiListContext } from '../../providers/StrapiListProvider';
import clsx from 'clsx';

interface CardProps {
    className?: string;
    renderItem: (item: any) => React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className = '', renderItem }) => {
    const { data } = useStrapiListContext();
    console.log(data)
    if (!data || data.length === 0) {
        return null; // Or return a fallback UI if necessary
    }

    return (
        <ul role='list' className={clsx("divide-y divide-gray-50-100", className)}>
            {data.map((item, index) => (
                <div key={item.id || index}>
                    {renderItem(item.attributes)}
                </div>
            ))}
        </ul>
    );
};

export default Card;
