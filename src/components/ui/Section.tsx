import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EASE_OUT } from '../../utils/motion';
import './Section.css';

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Titre fantôme : dérive latérale pendant la traversée de la section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ['6%', '-14%']);

  return (
    <section id={id} className={`site-section ${className}`.trim()} ref={sectionRef}>
      {title && (
        <motion.span
          className="site-section__ghost"
          style={prefersReducedMotion ? undefined : { x: ghostX }}
          aria-hidden="true"
        >
          {title}
        </motion.span>
      )}
      <div className="site-container site-section__content">
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
