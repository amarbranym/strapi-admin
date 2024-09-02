import React from 'react';
import { useStrapiListContext } from '../../providers/StrapiListProvider';



const Pagination = () => {
    const {currentPage = 1, setCurrentPage = () => {}, totalPage = 1} = useStrapiListContext()

    const handleNextPage = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default anchor behavior
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default anchor behavior
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
            <div className="-mt-px flex w-0 flex-1">
                <button
                    className={`inline-flex items-center border-t-2 pr-1 pt-4 text-sm font-medium ${currentPage > 1 ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
            </div>
            <div className="hidden md:-mt-px md:flex">
                <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPage}
                </span>
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <button
                    className={`inline-flex items-center border-t-2 pl-1 pt-4 text-sm font-medium ${currentPage < totalPage ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPage}
                >
                    Next
                </button>
            </div>
        </nav>
    );
}

export default Pagination;
