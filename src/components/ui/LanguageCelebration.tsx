import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import './LanguageCelebration.css';

interface LanguageCelebrationProps {
  /** true pour déclencher la célébration */
  show: boolean;
  label: string;
}

// Toujours l'Espagne : c'est elle qu'on célèbre, quelle que soit la langue du site
const FLAG = '🇪🇸';
const COLORS: [string, string, string] = ['#AA151B', '#FFC400', '#AA151B'];

const EASE_SCARF = [0.34, 1.56, 0.64, 1] as const;

// Burst circulaire de confettis, calculé une fois (angles fixes, look net et régulier)
const CONFETTI = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const radius = 40 + (i % 3) * 8;
  return {
    x: Math.round(Math.cos(angle) * radius),
    y: Math.round(Math.sin(angle) * radius),
    delay: (i % 4) * 0.035,
    colorIndex: i % 3,
  };
});

/** Toast éphémère façon "célébration de supporter" : l'Espagne, championne du monde. */
export default function LanguageCelebration({ show, label }: LanguageCelebrationProps) {
  return createPortal(
    <>
      {/* Fond plein écran aux couleurs du drapeau espagnol, un bref instant */}
      <AnimatePresence>
        {show && (
          <motion.div
            key="wash"
            className="lang-celebration__wash"
            style={{
              background: `linear-gradient(180deg, ${COLORS[0]} 0%, ${COLORS[0]} 25%, ${COLORS[1]} 25%, ${COLORS[1]} 75%, ${COLORS[2]} 75%, ${COLORS[2]} 100%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.3, times: [0, 0.18, 0.7, 1], ease: 'easeInOut' }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="lang-celebration__anchor">
        <AnimatePresence>
          {show && (
            <motion.div
              key="toast"
              className="lang-celebration"
              role="status"
              initial={{ opacity: 0, y: -18, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            >
              <span className="lang-celebration__confetti" aria-hidden="true">
                {CONFETTI.map((p, i) => (
                  <motion.span
                    key={i}
                    className="lang-celebration__particle"
                    style={{ background: COLORS[p.colorIndex] }}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                    animate={{ opacity: [0, 1, 0], x: p.x, y: p.y, scale: 1, rotate: 200 }}
                    transition={{ duration: 1, delay: p.delay, ease: 'easeOut' }}
                  />
                ))}
              </span>

              <motion.span
                className="lang-celebration__flag"
                initial={{ scale: 0.4, rotate: -20 }}
                animate={{ scale: 1, rotate: [-20, 14, -8, 4, 0] }}
                transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                aria-hidden="true"
              >
                {FLAG}
              </motion.span>

              <span className="lang-celebration__body">
                <span className="lang-celebration__text">{label}</span>
                <motion.span
                  className="lang-celebration__scarf"
                  initial={{ scaleX: 0, rotate: 0 }}
                  animate={{ scaleX: 1, rotate: [0, -4, 3, -2, 0] }}
                  transition={{
                    scaleX: { duration: 0.35, delay: 0.15, ease: EASE_SCARF },
                    rotate: { duration: 1.1, delay: 0.4 },
                  }}
                  aria-hidden="true"
                />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>,
    document.body
  );
}
