import { motion, type Variants } from 'motion/react';
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

export default function Hero({ onOpenInternshipModal }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section id="accueil" className="hero">
      <motion.div
        className="site-container hero__inner"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.button className="hero__status" variants={item} onClick={onOpenInternshipModal}>
          <span className="hero__status-dot" aria-hidden="true" />
          {t('home_status')}
        </motion.button>

        <motion.h1 className="hero__title" variants={item}>
          {t('home_greeting')}
        </motion.h1>

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
    </section>
  );
}
