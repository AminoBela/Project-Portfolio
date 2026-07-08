import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Briefcase, GraduationCap } from 'lucide-react';
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
    <li className={`journey__item ${isOpen ? 'is-open' : ''}`}>
      {/* Hairline qui se trace à l'entrée dans le viewport */}
      <motion.span
        className="journey__line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        aria-hidden="true"
      />

      <button className="journey__head" onClick={onToggle} aria-expanded={isOpen}>
        <span className="journey__year">
          {entry.year}
          {entry.status === 'current' && <span className="journey__live-dot" aria-hidden="true" />}
        </span>

        <span className="journey__identity">
          {entry.logo && <img src={entry.logo} alt="" className="journey__logo" loading="lazy" />}
          <span className="journey__head-text">
            <span className="journey__title">{t(entry.title)}</span>
            <span className="journey__org">
              {org && t(org)} · {t(entry.location)}
            </span>
          </span>
        </span>

        <span className="journey__meta">
          <span className="journey__period">{t(entry.period)}</span>
          <ChevronDown
            size={17}
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
    </li>
  );
}

export default function Journey() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('experience');
  const [openId, setOpenId] = useState<string | null>(null);

  const entries = tab === 'experience' ? experiencesData : educationData;

  const selectTab = (next: Tab) => {
    setTab(next);
    setOpenId(null);
  };

  return (
    <Section id="parcours" title={t('nav_experience')}>
      <div className="journey__tabs" role="tablist" aria-label={t('nav_experience')}>
        {(
          [
            { key: 'experience', icon: Briefcase, labelKey: 'experience_title' },
            { key: 'education', icon: GraduationCap, labelKey: 'education_title' },
          ] as const
        ).map(({ key, icon: Icon, labelKey }) => (
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
            <span className="journey__tab-label">
              <Icon size={15} aria-hidden="true" />
              {t(labelKey)}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.ol
          key={tab}
          className="journey__list"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
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
    </Section>
  );
}
