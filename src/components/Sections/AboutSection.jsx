import React from 'react';
import { motion } from 'framer-motion';
import DesktopIcon from '../UI/DesktopIcon';
import TerminalWindow from './TerminalWindow';
import { useTerminalLogic } from '../../hooks/useTerminalLogic';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

function AboutSection() {
  const { isTerminalOpen, isTerminalMaximized, toggleTerminal, maximizeTerminal } = useTerminalLogic();

  return (
    <motion.section
      id="a-propos"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="terminal-section about-section"
    >
      <div className="container">
        <motion.h2 variants={childVariants} className="terminal-command about-title">
          &gt; À propos de moi
        </motion.h2>
        <motion.p variants={childVariants} className="terminal-text about-subtitle">
          Dossier personnel : Amin Belalia
        </motion.p>
        <motion.div variants={childVariants} className="desktop-background">
          <DesktopIcon onClick={toggleTerminal} />
          {isTerminalOpen && (
            <TerminalWindow
              isMaximized={isTerminalMaximized}
              toggleTerminal={toggleTerminal}
              maximizeTerminal={maximizeTerminal}
            />
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default AboutSection;
