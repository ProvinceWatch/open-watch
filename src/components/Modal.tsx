import React, { useEffect } from 'react';
// can use this modal anywhere
// see CameraGrid.tsx return statement for opening a new modal.
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  if (!open) {
    return null;
  }

  // change the style of modal here.
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={onClose} />
      <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto z-50 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
