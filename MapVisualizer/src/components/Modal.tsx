import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  name:string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children,name }) => {
  if (!isOpen) return null; // rien n'est affiché si le modal est fermé

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Conteneur du modal */}
      <div className="bg-white rounded-lg shadow-lg w-150 flex-wrap justify-center">
        <header className="w-full h-8 bg-blue-50 rounded-t-lg relative flex flex-wrap items-center">
          <span className="m-2 text-l font-bold text-center">{name}</span>
          <button
            className="absolute top-1.5 right-2 w-5 h-5 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded leading-none"
            onClick={onClose}
          >
            ✕
          </button>
        </header>
        {/* Bouton fermer */}


        {/* Contenu du modal */}
        <div className="m-1 flex justify-center">
            {children}
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
