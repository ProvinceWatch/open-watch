import React, { useEffect } from 'react';

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

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" onClick={onClose} />
      <div className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto z-50 overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute right-3 top-3 text-gray-700 hover:text-gray-900 transition-colors duration-200"
          aria-label="Close Modal"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
