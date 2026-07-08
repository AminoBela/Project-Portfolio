import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import Section from '../ui/Section';
import { EASE_OUT } from '../../utils/motion';
import { educationData, experiencesData } from '../../data/experienceEducationData';
import type { TimelineEntry } from '../../types/content';
import './Journey.css';

type Tab = 'experience' | 'education';

const tabPillSpring = { type: 'spring', stiffness: 400, damping: 34 } as const;

function JourneyItem({ entry, isOpen, onToggle }: {
  entry: TimelineEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { t } = useTranslation();
  const org = entry.company ?? entry.institution;

  return (
    <motion.li
      className={`journey__item ${entry.status ? `journey__item--${entry.status}` : ''}`}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      <span className="journey__node" aria-hidden="true" />

      <button className="journey__head" onClick={onToggle} aria-expanded={isOpen}>
        {entry.logo && <img src={entry.logo} alt="" className="journey__logo" loading="lazy" />}
        <span className="journey__head-text">
          <span className="journey__title">{t(entry.title)}</span>
          <span className="journey__org">
            {org && t(org)} · {t(entry.location)}
          </span>
        </span>
        <span className="journey__meta">
          <span className="journey__period">{t(entry.period)}</span>
          <ChevronDown
            size={16}
            className={`journey__chevron ${isOpen ? 'is-open' : ''}`}
            aria-hidden="true"
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="journey__details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <div className="journey__details-inner">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 }}
              >
                {t(entry.description)} {entry.details.intro && t(entry.details.intro)}
              </motion.p>
              <ul className="journey__tech">
                {entry.details.tech.map((tech, i) => (
                  <motion.li
                    key={tech}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.16 + i * 0.04 }}
                  >
                    {tech}
                  </motion.li>
                ))}
              </ul>
              <ul className="journey__highlights">
                {entry.details.highlights.map((highlight, i) => (
                  <motion.li
                    key={highlight}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.22 + i * 0.07 }}
                  >
                    {t(highlight)}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function Journey() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('experience');
  const [openId, setOpenId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.55'],
  });

  const entries = tab === 'experience' ? experiencesData : educationData;

  const selectTab = (next: Tab) => {
    setTab(next);
    setOpenId(null);
  };

  return (
    <Section id="parcours" title={t('nav_experience')}>
      <div className="journey__tabs" role="tablist" aria-label={t('nav_experience')}>
        {(['experience', 'education'] as const).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            className={tab === key ? 'is-active' : ''}
            onClick={() => selectTab(key)}
          >
            {tab === key && (
              <motion.span
                className="journey__tab-pill"
                layoutId="journey-tab"
                transition={tabPillSpring}
              />
            )}
            <span>{t(key === 'experience' ? 'experience_title' : 'education_title')}</span>
          </button>
        ))}
      </div>

      <div className="journey__timeline" ref={timelineRef}>
        <span className="journey__rail" aria-hidden="true">
          <motion.span className="journey__rail-progress" style={{ scaleY: scrollYProgress }} />
        </span>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.ol
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            {entries.map((entry) => (
              <JourneyItem
                key={entry.id}
                entry={entry}
                isOpen={openId === entry.id}
                onToggle={() => setOpenId(openId === entry.id ? null : entry.id)}
              />
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </Section>
  );
}
