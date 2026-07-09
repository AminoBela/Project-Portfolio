import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { EASE_OUT } from '../../utils/motion';
import './ScrollToTopButton.css';

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        setIsVisible(scrollTop > 600);
        setProgress(maxScroll > 0 ? Math.min(1, scrollTop / maxScroll) : 0);
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          className="scroll-top"
          aria-label="Retour en haut"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          <svg className="scroll-top__ring" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r={RADIUS} className="scroll-top__track" />
            <circle
              cx="24"
              cy="24"
              r={RADIUS}
              className="scroll-top__fill"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
            />
          </svg>
          <ArrowUp size={16} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
