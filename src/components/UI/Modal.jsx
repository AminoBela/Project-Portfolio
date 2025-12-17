import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/Modal.css';

const modalVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Modal({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            variants={{
              hidden: { y: "-50px", opacity: 0 },
              visible: { y: "0", opacity: 1 },
              exit: { y: "50px", opacity: 0 },
            }}
          >
            <button onClick={onClose} className="modal-close-button">&times;</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
