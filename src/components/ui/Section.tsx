import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { EASE_OUT } from '../../utils/motion';
import './Section.css';

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`site-section ${className}`.trim()}>
      <div className="site-container">
        {title && (
          <h2 className="site-section__title">
            <span className="site-section__title-mask">
              <motion.span
                className="site-section__title-text"
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
              >
                {title}
              </motion.span>
            </span>
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
