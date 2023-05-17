import { Button } from 'flowbite-react'

interface CameraGridSizeProps {
    onAddColumns: () => void;
    onReduceColumns: () => void;
}

const CameraGridSize = ({ onAddColumns, onReduceColumns }: CameraGridSizeProps) => {


    return (
        <div className="p-4 fixed bottom-5 right-0 z-index-1001">
            <Button.Group>
                <Button onClick={onAddColumns}>
                    Zoom Out
                </Button>
                <Button onClick={onReduceColumns}>
                    Zoom In
                </Button>
            </Button.Group>
        </div>
    );
};


export default CameraGridSize;