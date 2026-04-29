import React from 'react';
import { useTranslation } from 'react-i18next';
import photo from '../../assets/photo-profil.jpg';
import cvPdf from '../../assets/cv.pdf';
import '../../styles/components.css';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

const languagesData = [
    { key: 'lang_french', code: 'FR', level: 100, levelKey: 'lang_level_bilingual' },
    { key: 'lang_spanish', code: 'ES', level: 100, levelKey: 'lang_level_bilingual' },
    { key: 'lang_english', code: 'EN', level: 85, levelKey: 'lang_level_toeic' },
    { key: 'lang_arabic', code: 'AR', level: 70, levelKey: 'lang_level_good' },
    { key: 'lang_valencian', code: 'VA', level: 65, levelKey: 'lang_level_good' },
];

export default function AboutSection({ onOpenInternshipModal }) {
    const { t } = useTranslation();

    return (
        <motion.section
            id="about"
            className="about-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {/* ── Hero intro row ──────────────────── */}
            <motion.div className="about-hero" variants={childVariants}>
                <div className="about-hero__photo-wrap">
                    <div className="about-hero__glow" />
                    <img src={photo} alt="Amin Belalia" className="about-hero__photo" loading="lazy" />
                    <div className="about-hero__badge">
                        <span className="about-hero__dot" />
                        {t('about_available')}
                    </div>
                </div>
                <div className="about-hero__text">
                    <h2 className="about-hero__name">
                        <span className="about-hero__firstname">Amin</span> Belalia
                    </h2>
                    <p className="about-hero__tagline">{t('about_tagline')}</p>
                    <div className="about-hero__actions">
                        <a href={cvPdf} className="about-btn about-btn--primary" target="_blank" rel="noopener noreferrer">
                            <i className="fa-solid fa-download" /> CV
                        </a>
                        <a href="https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/" className="about-btn about-btn--ghost" target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin-in" />
                        </a>
                        <a href="mailto:abelaliabendjafar@gmail.com" className="about-btn about-btn--ghost">
                            <i className="fa-solid fa-envelope" />
                        </a>
                    </div>
                </div>
            </motion.div>

            {/* ── Bento grid ─────────────────────── */}
            <div className="about-bento">
                {/* Bio — large card */}
                <motion.div className="bento-card bento-card--bio" variants={childVariants}>
                    <div className="bento-card__header">
                        <i className="fa-solid fa-user-astronaut" />
                        <h3>{t('about_bio_title')}</h3>
                    </div>
                    <p>{t('about_bio_text')}</p>
                </motion.div>

                {/* Internship CTA */}
                <motion.div
                    className="bento-card bento-card--cta"
                    variants={childVariants}
                    onClick={onOpenInternshipModal}
                    data-cursor="pointer"
                >
                    <div className="bento-cta__icon">
                        <i className="fa-solid fa-graduation-cap" />
                    </div>
                    <h4>{t('about_internship_title')}</h4>
                    <p dangerouslySetInnerHTML={{ __html: t('about_internship_desc') }} />
                    <div className="bento-cta__footer">
                        <span><i className="fa-regular fa-calendar" /> {t('about_internship_date')}</span>
                        <span className="bento-cta__arrow" dangerouslySetInnerHTML={{ __html: t('about_internship_more') }} />
                    </div>
                </motion.div>

                {/* Skills */}
                <motion.div className="bento-card bento-card--skills" variants={childVariants}>
                    <div className="bento-card__header">
                        <i className="fa-solid fa-layer-group" />
                        <h3>{t('about_skills_title')}</h3>
                    </div>
                    <ul className="bento-skills__list">
                        <li>{t('about_skills_1')}</li>
                        <li>{t('about_skills_2')}</li>
                        <li>{t('about_skills_3')}</li>
                    </ul>
                </motion.div>

                {/* Languages */}
                <motion.div className="bento-card bento-card--langs" variants={childVariants}>
                    <div className="bento-card__header">
                        <i className="fa-solid fa-earth-europe" />
                        <h3>{t('about_languages_title')}</h3>
                    </div>
                    <div className="bento-langs">
                        {languagesData.map(lang => (
                            <div key={lang.key} className="bento-lang-row">
                                <span className="bento-lang-code">{lang.code}</span>
                                <div className="bento-lang-info">
                                    <div className="bento-lang-meta">
                                        <span className="bento-lang-name">{t(lang.key)}</span>
                                        <span className="bento-lang-level">{t(lang.levelKey)}</span>
                                    </div>
                                    <div className="bento-lang-bar">
                                        <div className="bento-lang-fill" style={{ width: `${lang.level}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
