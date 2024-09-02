import React, { ButtonHTMLAttributes } from 'react';
// import { ImSpinner6 } from "react-icons/im";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'md' | 'lg';
    rounded?: 'sm' | 'md' | 'lg' | 'full';
    bg?: 'white' | 'solid';
    loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
    size = 'md',
    rounded = 'md',
    bg = 'white',
    children,
    loading = false,
    ...props
}) => {
    const sizeClass = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-4 py-2',
        lg: 'text-lg px-6 py-2',
    }[size];

    const roundedClass = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    }[rounded];

    const bgClass = {
        solid: " bg-blue-600  font-semibold  text-gray-50 shadow-sm hover:bg-blue-700   focus-visible:outline-blue-600",
        white: " bg-white  duration-300 text-gray-900 shadow-sm ring-1 ring-inset ring-dark-300 hover:bg-blue-300  font-semibold   "
    }[bg];



    return (
        <button
            className={`inline-flex items-center gap-1 justify-center   shadow-sm focus:outline-none focus:ring-2  focus:ring-opacity-50 ${sizeClass} ${roundedClass} ${bgClass} `}
            {...props}
        >
            {loading ? <>
                {/* <ImSpinner6 className='animate-spin mr-3' /> */}
                Loading...
            </> : (
                <>{children}</>
            )}

        </button>
    );
};

export default Button;
