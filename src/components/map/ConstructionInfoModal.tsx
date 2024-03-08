"use client"

import { FC } from 'react';
import { Alert, Modal } from 'flowbite-react';
import { ConstructionData } from '@/app/api/construction/types';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  constructionEvent: ConstructionData;
}

const ConstructionInfoModal: FC<ModalProps> = ({ open, onClose, constructionEvent }) => {
  return (
    <Modal
      dismissible
      show={open}
      onClose={onClose}
      className='rounded'
    >
      <div tabIndex={-1}>

        <Modal.Header className='text-center'>
          {constructionEvent.RoadwayName} ({new Date(constructionEvent.StartDate * 1000).toDateString()} - {new Date(constructionEvent.PlannedEndDate * 1000).toDateString()})
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }}>
          <Alert>
            {constructionEvent.Details}
          </Alert>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default ConstructionInfoModal;
