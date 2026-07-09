import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT } from '../../utils/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Révèle son contenu en douceur à l'entrée dans le viewport (une seule fois). */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
