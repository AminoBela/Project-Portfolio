import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Button from '../ui/Button';
import { EASE_OUT } from '../../utils/motion';
import cvPdf from '../../assets/cv.pdf';
import './Hero.css';

interface HeroProps {
  onOpenInternshipModal: () => void;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const titleWord: Variants = {
  hidden: { y: '115%' },
  visible: (i: number) => ({
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT, delay: 0.15 + i * 0.12 },
  }),
};

export default function Hero({ onOpenInternshipModal }: HeroProps) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll-out : le contenu rétrécit, remonte et se fond quand on quitte le héro
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const scrollStyle = prefersReducedMotion ? undefined : { scale, opacity, y };

  return (
    <section id="accueil" className="hero" ref={sectionRef}>
      <motion.div className="site-container hero__inner" style={scrollStyle}>
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.button className="hero__status" variants={item} onClick={onOpenInternshipModal}>
            <span className="hero__status-dot" aria-hidden="true" />
            {t('home_status')}
          </motion.button>

          <h1 className="hero__title">
            {t('home_greeting')
              .split(' ')
              .map((word, i) => (
                <span className="hero__title-mask" key={`${word}-${i}`}>
                  <motion.span className="hero__title-word" variants={titleWord} custom={i}>
                    {word}
                  </motion.span>
                </span>
              ))}
          </h1>

          <motion.p className="hero__subtitle" variants={item}>
            {t('home_subtitle_1')} · {t('home_subtitle_2')}
          </motion.p>

          <motion.p className="hero__desc" variants={item}>
            {t('home_description')}
          </motion.p>

          <motion.div className="hero__actions" variants={item}>
            <Button variant="primary" href="#projets">
              {t('home_btn_projects')} <ArrowDown />
            </Button>
            <Button href={cvPdf} target="_blank" rel="noopener noreferrer">
              {t('home_btn_cv')} <ArrowUpRight />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}
