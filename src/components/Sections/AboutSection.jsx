import React from 'react';
import { useTranslation } from 'react-i18next';
import photo from '../../assets/photo-profil.jpg';
import cvPdf from '../../assets/cv.pdf';
import '../../styles/components.css';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

const highlights = [
    { icon: 'fa-network-wired', label: 'about_highlight_network', value: 'TCP/IP' },
    { icon: 'fa-linux', label: 'about_highlight_system', value: 'Unix' },
    { icon: 'fa-docker', label: 'about_highlight_devops', value: 'Docker' },
];

const languages = ['lang_french', 'lang_english', 'lang_spanish', 'lang_valencian', 'lang_arabic'];

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
            <div className="about-container-redesigned">
                <div className="about-visual-column">
                    <motion.div className="about-photo-wrapper" variants={childVariants}>
                        <div className="photo-blob"></div>
                        <img src={photo} alt="Amin Belalia" className="about-photo-redesigned" />
                        <div className="photo-badge">
                            <span className="status-dot"></span> {t('about_available')}
                        </div>
                    </motion.div>

                    <motion.div className="about-intro-text" variants={childVariants}>
                        <h2 className="about-title-redesigned">
                            <span className="highlight-text">Amin</span> <br /> Belalia
                        </h2>
                        <p className="about-tagline">{t('about_tagline')}</p>
                        <div className="about-actions">
                            <a href={cvPdf} className="btn-download" target="_blank" rel="noopener noreferrer">
                                <i className="fa-solid fa-download"></i> CV
                            </a>
                            <a href="https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/" className="btn-social" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="mailto:abelaliabendjafar@gmail.com" className="btn-social">
                                <i className="fa-solid fa-envelope"></i>
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="about-content-column">
                    <motion.div className="about-bio-card" variants={childVariants}>
                        <h3><i className="fa-solid fa-user-astronaut"></i> {t('about_bio_title')}</h3>
                        <p>{t('about_bio_text')}</p>
                    </motion.div>

                    <motion.div
                        className="internship-card"
                        variants={childVariants}
                        onClick={onOpenInternshipModal}
                        data-cursor="pointer"
                    >
                        <div className="internship-icon">
                            <i className="fa-solid fa-briefcase"></i>
                        </div>
                        <div className="internship-content">
                            <h4>{t('about_internship_title')}</h4>
                            <p dangerouslySetInnerHTML={{ __html: t('about_internship_desc') }} />
                            <div className="internship-details">
                                <span><i className="fa-regular fa-calendar"></i> {t('about_internship_date')}</span>
                                <span className="click-hint" dangerouslySetInnerHTML={{ __html: t('about_internship_more') }} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="about-stats-row" variants={childVariants}>
                        {highlights.map((metric) => (
                            <div key={metric.label} className="stat-card">
                                <i className={`fa-solid ${metric.icon}`}></i>
                                <span className="stat-value">{metric.value}</span>
                                <span className="stat-label">{t(metric.label)}</span>
                            </div>
                        ))}
                    </motion.div>

                    <div className="about-details-grid">
                        <motion.div className="detail-card" variants={childVariants}>
                            <h4><i className="fa-solid fa-layer-group"></i> {t('about_skills_title')}</h4>
                            <ul>
                                <li>{t('about_skills_1')}</li>
                                <li>{t('about_skills_2')}</li>
                                <li>{t('about_skills_3')}</li>
                            </ul>
                        </motion.div>

                        <motion.div className="detail-card" variants={childVariants}>
                            <h4><i className="fa-solid fa-earth-europe"></i> {t('about_languages_title')}</h4>
                            <div className="lang-tags">
                                {languages.map(l => <span key={l}>{t(l)}</span>)}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
