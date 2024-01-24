import { Button } from 'flowbite-react';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="flex items-center justify-center my-2 gap-4">
      <Button onClick={onPrevPage} disabled={currentPage === 1} className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
        Previous
      </Button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <Button onClick={onNextPage} disabled={currentPage === totalPages} className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
