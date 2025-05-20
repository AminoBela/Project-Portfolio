import React from 'react';
import { motion } from 'framer-motion';

function DesktopIcon({ onClick }) {
  return (
    <motion.div
      className="desktop-icon"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <i className="fas fa-terminal desktop-icon-symbol"></i>
      <span className="desktop-icon-label">Terminal</span>
    </motion.div>
  );
}

export default DesktopIcon;
