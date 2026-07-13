import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useTranslation } from 'react-i18next';
import './Statement.css';

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span className="statement__word" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/** Grande phrase manifeste qui s'allume mot par mot au fil du scroll. */
export default function Statement() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.45'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  const words = t('statement_text').split(' ');

  if (prefersReducedMotion) {
    return (
      <section className="statement" aria-label={t('statement_text')}>
        <div className="site-container">
          <p className="statement__text">{t('statement_text')}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="statement" aria-label={t('statement_text')}>
      <div className="site-container" ref={ref}>
        <motion.p className="statement__text" style={{ scale }} aria-hidden="true">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            >
              {word}
            </Word>
          ))}
        </motion.p>
      </div>
    </section>
  );
}
