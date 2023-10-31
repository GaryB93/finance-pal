import { useRef, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { GrClose } from 'react-icons/gr';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, hasCloseBtn, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  // const [isModalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    const modalElement = modalRef.current;
    const closeBtnElement = closeRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
        closeBtnElement?.blur();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  // useEffect(() => {
  //   setModalOpen(isOpen);
  // }, [isOpen]);

  // useEffect(() => {
  //   const modalElement = modalRef.current;
  //   if (modalElement) {
  //     if (isModalOpen) {
  //       modalElement.showModal();
  //     } else {
  //       modalElement.close();
  //     }
  //   }
  // }, [isModalOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    // setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog ref={modalRef} className='modal' onKeyDown={handleKeyDown}>
      {hasCloseBtn &&
        <div>
          <button onClick={handleCloseModal} aria-label='close' ref={closeRef}>
            <IconContext.Provider value={{ className: 'modal-close' }}>
              <GrClose/>
            </IconContext.Provider>
          </button>
        </div>
      }
      {children}
    </dialog>
  );
};

export default Modal;