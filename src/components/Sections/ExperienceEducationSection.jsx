import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { timelineData } from '../../data/experienceEducationData';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';
import Modal from '../UI/Modal';

const TimelineCard = ({ item, onSelect, t }) => (
    <motion.div
        className="timeline-card-compact"
        onClick={() => onSelect(item)}
        variants={childVariants}
        whileHover={{ y: -5 }}
        data-cursor="pointer"
    >
        <div className="timeline-card-compact-header">
            <div className="timeline-card-compact-icon">
                <i className={`fa-solid ${item.type === 'experience' ? 'fa-briefcase' : 'fa-graduation-cap'}`}></i>
            </div>
            <h3 className="timeline-card-compact-title">{t(item.title)}</h3>
        </div>
        <span className="timeline-card-compact-period">{t(item.period)}</span>
    </motion.div>
);

function ExperienceEducationSection() {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState(null);

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
                    &gt; {t('experience_title')} & {t('education_title')}
                </motion.h2>

                <div className="timeline-container">
                    {timelineData.map((item, index) => (
                        <div key={item.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                             <div className="timeline-icon-wrapper">
                                <i className={`fa-solid ${item.type === 'experience' ? 'fa-briefcase' : 'fa-graduation-cap'}`}></i>
                            </div>
                            <TimelineCard item={item} onSelect={setSelectedItem} t={t} />
                        </div>
                    ))}
                </div>
            </div>

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
                                <p className="expanded-card-subtitle">{t(selectedItem.company || selectedItem.institution)} • {t(selectedItem.location)}</p>
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
                                    <span className="stat-value">{selectedItem.type === 'experience' ? t('experience_title') : t('education_title')}</span>
                                </div>
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
                                        <div className="tech-stack" style={{marginTop: '2rem'}}>
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
        </motion.section>
    );
}

export default ExperienceEducationSection;
