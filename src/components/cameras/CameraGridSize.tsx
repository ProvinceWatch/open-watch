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
    if (columns > 3) {
      setColumns(columns - 1);
      onReduceColumns();
    }
  }

  return (
    <div className="p-4 gap-2 fixed bottom-5 right-0 z-index-1001 flex">
      <Button onClick={handleAdd} disabled={columns >= 5}>
        -
      </Button>
      <Button onClick={handleReduce} disabled={columns <= 3}>
        +
      </Button>
    </div>
  );
};

export default CameraGridSize;
