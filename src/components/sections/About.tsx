import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Trans, useTranslation } from 'react-i18next';
import {
  IdCard,
  Languages,
  MapPin,
  GraduationCap,
  ArrowRight,
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

const LANGUAGES_DATA: ReadonlyArray<{ code: string; key: TranslationKey; levelKey: TranslationKey }> = [
  { code: 'FR', key: 'lang_french', levelKey: 'lang_level_bilingual' },
  { code: 'ES', key: 'lang_spanish', levelKey: 'lang_level_bilingual' },
  { code: 'EN', key: 'lang_english', levelKey: 'lang_level_toeic' },
  { code: 'AR', key: 'lang_arabic', levelKey: 'lang_level_good' },
  { code: 'VA', key: 'lang_valencian', levelKey: 'lang_level_good' },
];

const STATS: ReadonlyArray<{ value: number; suffix: string; labelKey: TranslationKey }> = [
  { value: 3, suffix: '+', labelKey: 'stats_years' },
  { value: 10, suffix: '+', labelKey: 'stats_technologies' },
  { value: 15, suffix: '+', labelKey: 'stats_projects' },
  { value: 5, suffix: '', labelKey: 'stats_languages' },
];

const INTERESTS: ReadonlyArray<{ id: string; icon: LucideIcon; titleKey: TranslationKey }> = [
  { id: 'oriaction', icon: Compass, titleKey: 'engagement_oriaction_title' },
  { id: 'crous', icon: House, titleKey: 'engagement_crous_title' },
  { id: 'jpo', icon: DoorOpen, titleKey: 'engagement_jpo_title' },
  { id: 'motorsport', icon: Flag, titleKey: 'hobby_motorsport' },
  { id: 'homelab', icon: Server, titleKey: 'hobby_homelab' },
  { id: 'travel', icon: Plane, titleKey: 'hobby_travel' },
  { id: 'mechanic', icon: Wrench, titleKey: 'hobby_mechanic' },
];

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
            <img src={photo} alt="Amin Belalia" className="about__photo" loading="lazy" />
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
              {LANGUAGES_DATA.map(({ code, key, levelKey }) => (
                <li key={code}>
                  <span className="about__lang-code">{code}</span>
                  <span>{t(key)}</span>
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

      <Reveal>
        <button className="about__cta" onClick={onOpenInternshipModal}>
          <span className="about__cta-icon">
            <GraduationCap size={20} />
          </span>
          <span className="about__cta-body">
            <span className="about__cta-title">{t('about_internship_title')}</span>
            <span className="about__cta-desc">
              <Trans i18nKey="about_internship_desc" components={{ strong: <strong /> }} />
            </span>
          </span>
          <span className="about__cta-arrow">
            <ArrowRight size={18} />
          </span>
        </button>
      </Reveal>

      <div className="about__interests">
        <Reveal>
          <h3 className="about__interests-title">{t('about_interests_title')}</h3>
        </Reveal>
        {prefersReducedMotion ? (
          <ul className="about__interests-chips">
            {INTERESTS.map(({ id, icon: Icon, titleKey }) => (
              <li key={id}>
                <Icon size={15} aria-hidden="true" />
                {t(titleKey)}
              </li>
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
                    {INTERESTS.map(({ id, icon: Icon, titleKey }) => (
                      <li key={id}>
                        <Icon size={15} aria-hidden="true" />
                        {t(titleKey)}
                      </li>
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
