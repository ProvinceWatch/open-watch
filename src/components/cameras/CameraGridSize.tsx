import { Button } from 'flowbite-react'
import { useState, useEffect } from 'react'

interface CameraGridSizeProps {
  onAddColumns: () => void;
  onReduceColumns: () => void;
  gridSize: string;
}

const CameraGridSize = ({ onAddColumns, onReduceColumns, gridSize }: CameraGridSizeProps) => {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const initialColumns = parseInt(gridSize.split('-')[2]);
    setColumns(initialColumns);
  }, [gridSize]);

  const handleAdd = () => {
    if (columns < 5) {
      setColumns(columns + 1);
      onAddColumns();
    }
  }

  const handleReduce = () => {
    if (columns > 1) {
      setColumns(columns - 1);
      onReduceColumns();
    }
  }

  return (
    <div className="p-4 fixed hidden sm:block bottom-5 right-0 z-index-1001">
      <div className='flex gap-2'>
        <Button
          onClick={handleAdd}
          disabled={columns >= 5}
          className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'
        >
          -
        </Button>
        <Button
          onClick={handleReduce}
          disabled={columns <= 1}
          className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default CameraGridSize;
