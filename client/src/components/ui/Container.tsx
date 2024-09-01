/* eslint-disable react/react-in-jsx-scope */
import clsx from 'clsx'
import { ElementType, ReactNode } from 'react';
interface ContainerProps {
    as?: ElementType;
    className?: string;
    children: ReactNode;
}
export function Container({ as: Component = 'div', className, children }: ContainerProps) {
    return (
        <Component className={clsx('mx-auto lg:max-w-5xl  px-3 lg:px-8', className)}>
            <div className="mx-auto lg:max-w-none">{children}</div>
        </Component>
    )
}
