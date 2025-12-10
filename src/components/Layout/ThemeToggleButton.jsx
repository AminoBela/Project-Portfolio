import React from 'react';
import { motion } from 'framer-motion';

function ThemeToggleButton({ toggleTheme, theme }) {
  return (
    <motion.button
      onClick={toggleTheme}
      className="theme-toggle-button"
      whileTap={{ scale: 0.9 }}
      aria-label={theme === 'terminal' ? 'Activer le mode clair' : 'Activer le mode terminal'}
    >
      <motion.i
        key={theme} // Change key to re-trigger animation on theme change
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fa-solid ${theme === 'terminal' ? 'fa-sun' : 'fa-moon'}`}
      ></motion.i>
    </motion.button>
  );
}

export default ThemeToggleButton;
