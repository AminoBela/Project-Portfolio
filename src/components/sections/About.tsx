import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';
import {
  IdCard,
  Languages,
  MapPin,
  ArrowUpRight,
  Compass,
  House,
  DoorOpen,
  Flag,
  Server,
  Plane,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import { useInViewCountUp } from '../../hooks/useCountUp';
import type { TranslationKey } from '../../types/content';
import photo from '../../assets/photo-profil.webp';
import './About.css';

interface AboutProps {
  onOpenInternshipModal: () => void;
}

const FACTS: ReadonlyArray<{ icon: LucideIcon; key: TranslationKey }> = [
  { icon: IdCard, key: 'about_fact_licence' },
  { icon: Languages, key: 'about_fact_toeic' },
  { icon: MapPin, key: 'about_fact_mobility' },
];

const LANGUAGES_DATA: ReadonlyArray<{
  key: TranslationKey;
  levelKey: TranslationKey;
  /** Niveau sur 5, affiché en points */
  level: number;
}> = [
  { key: 'lang_french', levelKey: 'lang_level_bilingual', level: 5 },
  { key: 'lang_spanish', levelKey: 'lang_level_bilingual', level: 5 },
  { key: 'lang_english', levelKey: 'lang_level_toeic', level: 4 },
  { key: 'lang_arabic', levelKey: 'lang_level_good', level: 3 },
  { key: 'lang_valencian', levelKey: 'lang_level_good', level: 3 },
];

const STATS: ReadonlyArray<{ value: number; suffix: string; labelKey: TranslationKey }> = [
  { value: 3, suffix: '+', labelKey: 'stats_years' },
  { value: 10, suffix: '+', labelKey: 'stats_technologies' },
  { value: 15, suffix: '+', labelKey: 'stats_projects' },
  { value: 5, suffix: '', labelKey: 'stats_languages' },
];

const INTERESTS: ReadonlyArray<{
  id: string;
  icon: LucideIcon;
  titleKey: TranslationKey;
  descKey: TranslationKey;
}> = [
  { id: 'oriaction', icon: Compass, titleKey: 'engagement_oriaction_title', descKey: 'engagement_oriaction_desc' },
  { id: 'crous', icon: House, titleKey: 'engagement_crous_title', descKey: 'engagement_crous_desc' },
  { id: 'jpo', icon: DoorOpen, titleKey: 'engagement_jpo_title', descKey: 'engagement_jpo_desc' },
  { id: 'motorsport', icon: Flag, titleKey: 'hobby_motorsport', descKey: 'hobby_motorsport_desc' },
  { id: 'homelab', icon: Server, titleKey: 'hobby_homelab', descKey: 'hobby_homelab_desc' },
  { id: 'travel', icon: Plane, titleKey: 'hobby_travel', descKey: 'hobby_travel_desc' },
  { id: 'mechanic', icon: Wrench, titleKey: 'hobby_mechanic', descKey: 'hobby_mechanic_desc' },
];

/** Pastille d'intérêt avec infobulle au survol/focus (portalisée : jamais rognée par le marquee). */
function InterestChip({
  icon: Icon,
  titleKey,
  descKey,
  tabbable = true,
}: (typeof INTERESTS)[number] & { tabbable?: boolean }) {
  const { t } = useTranslation();
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

  const show = (e: React.MouseEvent | React.FocusEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTip({ x: rect.left + rect.width / 2, y: rect.top });
  };
  const hide = () => setTip(null);

  return (
    <li>
      <button
        type="button"
        className="about__interest-chip"
        aria-label={`${t(titleKey)}. ${t(descKey)}`}
        tabIndex={tabbable ? 0 : -1}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        <Icon size={20} aria-hidden="true" />
        {t(titleKey)}
      </button>
      {createPortal(
        <AnimatePresence>
          {tip && (
            <motion.span
              className="interest-tip"
              style={{ left: tip.x, top: tip.y }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {t(descKey)}
            </motion.span>
          )}
        </AnimatePresence>,
        document.body
      )}
    </li>
  );
}

function Stat({ value, suffix, labelKey }: (typeof STATS)[number]) {
  const { t } = useTranslation();
  const { ref, count } = useInViewCountUp<HTMLDivElement>(value, { duration: 1600, delay: 150 });

  return (
    <div ref={ref} className="about__stat">
      <span className="about__stat-value">
        {count}
        {suffix}
      </span>
      <span className="about__stat-label">{t(labelKey)}</span>
    </div>
  );
}

export default function About({ onOpenInternshipModal }: AboutProps) {
  const { t } = useTranslation();
  const photoRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Parallaxe discrète sur la photo pendant la traversée de la section
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <Section id="about" title={t('nav_about')}>
      <div className="about__grid">
        <Reveal className="about__photo-col">
          <motion.div ref={photoRef} style={prefersReducedMotion ? undefined : { y: photoY }}>
            <img src={photo} alt="Amin Belalia" className="about__photo" loading="lazy" decoding="async" />
          </motion.div>
          <p className="about__availability">
            <span className="about__availability-dot" aria-hidden="true" />
            {t('about_available')} · {t('about_internship_date')}
          </p>
        </Reveal>

        <div className="about__content">
          <Reveal>
            <p className="about__lead">{t('about_tagline')}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="about__bio">{t('about_bio_text')}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="about__facts">
              {FACTS.map(({ icon: Icon, key }) => (
                <li key={key}>
                  <Icon size={15} aria-hidden="true" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="about__langs">
              {LANGUAGES_DATA.map(({ key, levelKey, level }) => (
                <li key={key} aria-label={`${t(key)} : ${t(levelKey)}`}>
                  <span className="about__lang-name">{t(key)}</span>
                  <span className="about__lang-dots" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <i key={n} className={n <= level ? 'is-on' : ''} />
                    ))}
                  </span>
                  <span className="about__lang-level">{t(levelKey)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <Reveal className="about__stats">
        {STATS.map((stat) => (
          <Stat key={stat.labelKey} {...stat} />
        ))}
      </Reveal>

      <div className="about__cta-block">
        <Reveal>
          <p className="about__cta-status">
            <span className="about__cta-status-dot" aria-hidden="true" />
            {t('about_available')} · {t('about_internship_date')}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <button className="about__cta-link" onClick={onOpenInternshipModal}>
            {t('about_internship_title')}
            <ArrowUpRight className="about__cta-link-arrow" aria-hidden="true" />
          </button>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="about__cta-desc">
            <Trans i18nKey="about_internship_desc" components={{ strong: <strong /> }} />
          </p>
          <p className="about__cta-meta">
            {t('modal_internship_duration_value')} · {t('alternance_rhythm_label')}{' '}
            {t('alternance_rhythm_value')} · {t('modal_internship_location_value')}
          </p>
        </Reveal>
      </div>

      <div className="about__interests">
        <Reveal>
          <h3 className="about__interests-title">{t('about_interests_title')}</h3>
        </Reveal>
        {prefersReducedMotion ? (
          <ul className="about__interests-chips">
            {INTERESTS.map((interest) => (
              <InterestChip key={interest.id} {...interest} />
            ))}
          </ul>
        ) : (
          <Reveal>
            <div className="about__marquee">
              <div className="about__marquee-track">
                {[0, 1].map((copy) => (
                  <ul
                    className="about__interests-chips about__interests-chips--marquee"
                    key={copy}
                    aria-hidden={copy === 1 || undefined}
                  >
                    {INTERESTS.map((interest) => (
                      <InterestChip key={interest.id} {...interest} tabbable={copy === 0} />
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
