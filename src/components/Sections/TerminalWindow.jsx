import React from 'react';
import { motion } from 'framer-motion';
import { aboutLines } from '../../data/aboutData';
import { terminalWindowVariants, lineVariants } from '../../utils/framerMotionVariants';

function TerminalWindow({ isMaximized, toggleTerminal, maximizeTerminal }) {
  return (
    <motion.div
      variants={terminalWindowVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`terminal-window ${isMaximized ? 'maximized' : ''}`}
    >
      <div className="terminal-header">
        <span className="terminal-button red" onClick={toggleTerminal}></span>
        <span className="terminal-button yellow"></span>
        <span className="terminal-button green" onClick={maximizeTerminal}></span>
        <span className="terminal-title">bash -- Amin Belalia</span>
      </div>
      <div className="terminal-body">
        {aboutLines.map((line, index) => (
          <motion.p
            key={index}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className={line.startsWith('user@') ? 'terminal-command-line' : 'terminal-text-line'}
          >
            {line}
          </motion.p>
        ))}
        <span className="terminal-cursor">|</span>
      </div>
    </motion.div>
  );
}

export default TerminalWindow;
