import { useMemo, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import './LanguageCelebration.css';

type LangCode = 'fr' | 'en' | 'es';

interface LanguageCelebrationProps {
  /** Langue à célébrer, ou null pour ne rien afficher */
  lang: string | null;
  label: string;
}

const FLAGS: Record<LangCode, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  es: '🇪🇸',
};

/** Trio de couleurs drapeau par langue, utilisé pour la bufanda et les confettis. */
const COLORS: Record<LangCode, [string, string, string]> = {
  fr: ['#0055A4', '#FFFFFF', '#EF4135'],
  en: ['#00247D', '#FFFFFF', '#CF142B'],
  es: ['#AA151B', '#FFC400', '#AA151B'],
};

function isLangCode(value: string | null): value is LangCode {
  return value === 'fr' || value === 'en' || value === 'es';
}

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

/** Toast éphémère façon "célébration de supporter" à chaque changement de langue. */
export default function LanguageCelebration({ lang, label }: LanguageCelebrationProps) {
  const code: LangCode = isLangCode(lang) ? lang : 'fr';
  const colors = COLORS[code];
  const flag = FLAGS[code];

  const style = useMemo(
    () =>
      ({
        '--lc-1': colors[0],
        '--lc-2': colors[1],
        '--lc-3': colors[2],
      }) as CSSProperties,
    [colors]
  );

  return createPortal(
    <div className="lang-celebration__anchor">
      <AnimatePresence>
        {lang && (
          <motion.div
            key={lang}
            className="lang-celebration"
            role="status"
            style={style}
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
                  style={{ background: colors[p.colorIndex] }}
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
              {flag}
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
    </div>,
    document.body
  );
}
