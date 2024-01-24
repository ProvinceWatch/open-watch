import { Button } from 'flowbite-react';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onGoToBeginning: () => void;
  onGoToLast: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onNextPage, onPrevPage, onGoToBeginning, onGoToLast }) => {
  return (
    <div className="flex items-center justify-center my-2 gap-4">
      <Button onClick={onGoToBeginning} disabled={currentPage === 1} className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
        First
      </Button>
      <Button onClick={onPrevPage} disabled={currentPage === 1} className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
        Previous
      </Button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <Button onClick={onNextPage} disabled={currentPage === totalPages} className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
        Next
      </Button>
      <Button onClick={onGoToLast} disabled={currentPage === totalPages} className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
        Last
      </Button>
    </div>
  );
};

export default Pagination;
