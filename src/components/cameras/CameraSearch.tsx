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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    } else if (event.key === 'Escape') {
      resetSearch();
    }
  };

  return (
    <div className="mb-4 flex flex-col sm:flex-row gap-4 mt-2">
      <input
        type="text"
        placeholder="Search cameras..."
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-gray-400"
      />
      <div className='flex gap-4'>
        <Button onClick={handleSearch} className='w-1/2 bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
          Search
        </Button>
        <Button onClick={resetSearch} className='w-1/2 bg-black enabled:hover:bg-gray-600 dark:bg-white dark:enabled:hover:bg-gray-600 dark:enabled:hover:text-white dark:text-black'>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default CameraSearch;
