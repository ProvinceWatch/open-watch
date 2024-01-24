import { CameraData } from '@/app/map/defs';
import { Button } from 'flowbite-react';
import React, { useState } from 'react';

interface CameraSearchProps {
  currentCameras: CameraData[];
  onSearchResult: (filteredCameras: CameraData[]) => void;
}

const CameraSearch: React.FC<CameraSearchProps> = ({ currentCameras, onSearchResult }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = () => {
    const filteredCameras = currentCameras.filter((camera) =>
      camera.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    onSearchResult(filteredCameras);
  };

  const resetSearch = () => {
    setSearchQuery(''); 
    onSearchResult(currentCameras);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        placeholder="Search cameras..."
        value={searchQuery}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400"
      />
      <Button onClick={handleSearch} className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
        Search
      </Button>
      <Button onClick={resetSearch} className='bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
        Reset
      </Button>
    </div>
  );
};

export default CameraSearch;
