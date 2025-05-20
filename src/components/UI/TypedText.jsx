import React from 'react';
import { motion } from 'framer-motion';
import { typedVariants, letterVariants } from '../../utils/framerMotionVariants';

export function TypedText({ text }) {
  return (
    <motion.div variants={typedVariants} initial="hidden" animate="visible" className="typed-text">
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={letterVariants} style={{ margin: '0 0.05rem' }}>
          {char}
        </motion.span>
      ))}
      <span className="cursor">|</span>
    </motion.div>
  );
}
