import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import '../../styles/Modal.css';

const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 24,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 28,
      mass: 0.9,
      opacity: { duration: 0.25, ease: 'easeOut' },
      filter: { duration: 0.3, ease: 'easeOut' },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 16,
    filter: 'blur(6px)',
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

function Modal({ isOpen, onClose, children, title }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-is-open');
      document.body.style.overflow = 'hidden';
      contentRef.current?.focus();
    } else {
      document.body.classList.remove('modal-is-open');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.classList.remove('modal-is-open');
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.div
            ref={contentRef}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
          >
            <button onClick={onClose} className="modal-close-button" aria-label="Fermer">&times;</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
