import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { educationData, experiencesData } from '../../data/experienceEducationData';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';
import Modal from '../UI/Modal';
import EducationRoadmap from './EducationRoadmap';

const TimelineCard = ({ item, onSelect, t }) => (
    <motion.div
        className="timeline-card-compact"
        onClick={() => onSelect(item)}
        variants={childVariants}
        // Hover géré par CSS
        data-cursor="pointer"
    >
        <div className="timeline-card-compact-header">
            <h3 className="timeline-card-compact-title">{t(item.title)}</h3>
        </div>
        <span className="timeline-card-compact-period">{t(item.period)}</span>
        <div className="timeline-card-icon">
            <i className="fa-solid fa-briefcase"></i>
        </div>
    </motion.div>
);

function ExperienceEducationSection() {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState(null);
    const [showAlternanceModal, setShowAlternanceModal] = useState(false);

    return (
        <motion.section
            id="parcours"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="terminal-section"
        >
            <div className="container">
                <motion.h2 variants={childVariants} className="terminal-command">
                    {t('nav_experience')}
                </motion.h2>

                {/* --- SECTION FORMATION (Roadmap) --- */}
                <EducationRoadmap
                    educationData={educationData}
                    t={t}
                    onSelect={setSelectedItem}
                    onAlternanceClick={() => setShowAlternanceModal(true)}
                />

                {/* --- SECTION EXPÉRIENCES (Grid) --- */}
                <h3 className="education-roadmap__title" style={{ marginTop: '2rem' }}>
                    <i className="fa-solid fa-briefcase"></i>
                    {t('experience_title')}
                </h3>

                <div className="timeline-container">
                    <motion.div
                        className="timeline-items"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {experiencesData.map((item) => (
                            <div key={item.id} className="timeline-item">
                                <TimelineCard item={item} onSelect={setSelectedItem} t={t} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* --- MODAL DÉTAILS (Formation ou Expérience) --- */}
            <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
                {selectedItem && (
                    <>
                        <div className="modal-hero" style={{
                            background: `linear-gradient(135deg, ${selectedItem.color || '#66ff99'}22 0%, rgba(0,0,0,0) 100%)`,
                            borderBottom: `1px solid ${selectedItem.color || '#66ff99'}44`
                        }}>
                            <div className="modal-hero__content">
                                {selectedItem.logo && <img src={selectedItem.logo} alt="" className="expanded-card-logo" />}
                                <h2>{t(selectedItem.title)}</h2>
                                <p className="expanded-card-subtitle">
                                    {t(selectedItem.company || selectedItem.institution)} • {t(selectedItem.location)}
                                </p>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="stats-grid">
                                <div className="stat-box">
                                    <span className="stat-label">{t('modal_internship_duration')}</span>
                                    <span className="stat-value">{t(selectedItem.period)}</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-label">Type</span>
                                    <span className="stat-value">
                                        {selectedItem.type === 'experience' ? t('experience_title') : t('education_title')}
                                    </span>
                                </div>
                                {selectedItem.status && (
                                    <div className="stat-box">
                                        <span className="stat-label">Statut</span>
                                        <span className="stat-value">{t(`education_status_${selectedItem.status}`)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="tech-section">
                                {selectedItem.description && <p className="project-full-desc">{t(selectedItem.description)}</p>}

                                {selectedItem.details && (
                                    <>
                                        {selectedItem.details.intro && <p className="project-full-desc">{t(selectedItem.details.intro)}</p>}
                                        <div className="tech-stack">
                                            <h4>{t('about_skills_title')}</h4>
                                            <div className="project-tags large">
                                                {selectedItem.details.tech.map(t_tech => <span key={t_tech} className="tag">{t_tech}</span>)}
                                            </div>
                                        </div>
                                        <div className="tech-stack" style={{ marginTop: '2rem' }}>
                                            <h4>{t('modal_internship_missions_title')}</h4>
                                            <ul className="highlights-list">
                                                {selectedItem.details.highlights.map((h, i) => <li key={i}><span>✓</span> {t(h)}</li>)}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Modal>

            {/* --- MODAL ALTERNANCE --- */}
            <Modal isOpen={showAlternanceModal} onClose={() => setShowAlternanceModal(false)}>
                <div className="modal-hero" style={{
                    background: 'linear-gradient(135deg, rgba(189, 147, 249, 0.15) 0%, rgba(0,0,0,0) 100%)',
                    borderBottom: '1px solid rgba(189, 147, 249, 0.3)'
                }}>
                    <div className="modal-hero__content">
                        <span className="modal-hero__badge" style={{ backgroundColor: '#bd93f9', color: '#000' }}>
                            {t('alternance_badge')}
                        </span>
                        <h2>{t('alternance_search_title')}</h2>
                        <p className="expanded-card-subtitle">{t('alternance_subtitle')}</p>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="stats-grid">
                        <div className="stat-box">
                            <span className="stat-label">{t('alternance_start_label')}</span>
                            <span className="stat-value">{t('alternance_start_value')}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">{t('alternance_duration_label')}</span>
                            <span className="stat-value">{t('alternance_duration_value')}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">{t('alternance_rhythm_label')}</span>
                            <span className="stat-value">{t('alternance_rhythm_value')}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">{t('alternance_location_label')}</span>
                            <span className="stat-value">{t('alternance_location_value')}</span>
                        </div>
                    </div>

                    <div className="tech-section">
                        <p className="project-full-desc">
                            {t('alternance_intro')}
                            <strong> {t('alternance_program')}</strong> {t('alternance_school')}
                        </p>
                        <p className="project-full-desc" style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            {t('alternance_rhythm_detail')} <strong>{t('alternance_rhythm_enterprise')}</strong> / <strong>{t('alternance_rhythm_school')}</strong>
                        </p>

                        <div className="tech-stack">
                            <h4>{t('alternance_domains_title')}</h4>
                            <div className="project-tags large">
                                {['Cybersécurité', 'Admin Système', 'DevOps', 'Cloud', 'Management SI', 'Infrastructure'].map(tag => (
                                    <span key={tag} className="tag" style={{ borderColor: '#bd93f9', color: '#bd93f9' }}>{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="modal-hero__actions" style={{ marginTop: '2rem' }}>
                            <a href="mailto:abelaliabendjafar@gmail.com" className="btn-github">
                                {t('alternance_cta_contact')}
                            </a>
                            <a href="https://linkedin.com/in/aminbelalia" target="_blank" rel="noopener noreferrer" className="btn-demo" style={{ color: '#bd93f9', borderColor: '#bd93f9' }}>
                                {t('alternance_cta_linkedin')}
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </motion.section>
    );
}

export default ExperienceEducationSection;
