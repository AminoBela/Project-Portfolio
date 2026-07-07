import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  Code,
  Gauge,
  Server,
  Database,
  Workflow,
  Users,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import { EASE_OUT } from '../../utils/motion';
import { skills } from '../../data/skillsData';
import { vutSkills } from '../../data/vutSkills';
import type { TranslationKey } from '../../types/content';
import './Skills.css';

const CATEGORIES: ReadonlyArray<{ name: string; labelKey: TranslationKey }> = [
  { name: 'Systèmes & Réseaux', labelKey: 'skills_cat_sysnet' },
  { name: 'Virtualisation & Services', labelKey: 'skills_cat_virt_services' },
  { name: 'Dév & Web', labelKey: 'skills_cat_dev_web' },
  { name: 'Méthodes', labelKey: 'skills_cat_methods' },
];

const VUT_ICONS: Record<string, LucideIcon> = {
  'fa-solid fa-code': Code,
  'fa-solid fa-gauge-high': Gauge,
  'fa-solid fa-server': Server,
  'fa-solid fa-database': Database,
  'fa-solid fa-diagram-project': Workflow,
  'fa-solid fa-users': Users,
};

function getLevelLabel(level: number): TranslationKey {
  if (level >= 85) return 'legend_expert';
  if (level >= 75) return 'legend_advanced';
  if (level >= 60) return 'legend_confirmed';
  return 'legend_progress';
}

export default function Skills() {
  const { t } = useTranslation();

  return (
    <Section id="competences" title={t('nav_skills')}>
      {/* ── Domaines de compétences (BUT) ─────── */}
      <Reveal>
        <h3 className="skills__subtitle">{t('skills_vut_title')}</h3>
        <p className="skills__intro">{t('skills_vut_intro')}</p>
      </Reveal>

      <ul className="skills__domains">
        {vutSkills.map((skill, i) => {
          const Icon = VUT_ICONS[skill.icon] ?? Code;
          return (
            <motion.li
              key={skill.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: (i % 3) * 0.06 }}
            >
              <div className="skills__domain-head">
                <Icon size={18} aria-hidden="true" />
                <span className="skills__domain-level">{t(skill.level)}</span>
              </div>
              <h4>{t(skill.name)}</h4>
              <p>{t(skill.comment)}</p>
              {skill.github && (
                <a href={skill.github} target="_blank" rel="noopener noreferrer">
                  {t('skills_vut_project_button')} <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </motion.li>
          );
        })}
      </ul>

      {/* ── Technologies ───────────────────────── */}
      <Reveal>
        <h3 className="skills__subtitle skills__subtitle--spaced">{t('technologies_title')}</h3>
      </Reveal>

      {CATEGORIES.map(({ name, labelKey }) => {
        const items = skills
          .filter((skill) => skill.category === name)
          .sort((a, b) => b.level - a.level);
        if (items.length === 0) return null;

        return (
          <div key={name} className="skills__category">
            <Reveal>
              <h4 className="skills__category-name">{t(labelKey)}</h4>
            </Reveal>
            <motion.ul
              className="skills__chips"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            >
              {items.map((skill) => (
                <motion.li
                  key={skill.name}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
                  }}
                >
                  <img src={skill.icon} alt="" width={16} height={16} loading="lazy" />
                  {skill.name}
                  <span className="skills__chip-level">{t(getLevelLabel(skill.level))}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        );
      })}
    </Section>
  );
}
