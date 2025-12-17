import React, { useState } from 'react';
import { timelineData } from '../../data/experienceEducationData';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';
import Modal from '../UI/Modal'; // On réutilise le composant Modal des projets

// --- CARTE COMPACTE (TIMELINE) ---
const TimelineCard = ({ item, onSelect }) => (
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
            <h3 className="timeline-card-compact-title">{item.title}</h3>
        </div>
        <span className="timeline-card-compact-period">{item.period}</span>
    </motion.div>
);

// --- Composant principal de la section ---
function ExperienceEducationSection() {
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
                    &gt; Mon Parcours
                </motion.h2>

                <div className="timeline-container">
                    {timelineData.map((item, index) => (
                        <div key={item.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                             <div className="timeline-icon-wrapper">
                                <i className={`fa-solid ${item.type === 'experience' ? 'fa-briefcase' : 'fa-graduation-cap'}`}></i>
                            </div>
                            <TimelineCard item={item} onSelect={setSelectedItem} />
                        </div>
                    ))}
                </div>
            </div>

            {/* --- MODALE (Exactement comme pour les projets) --- */}
            <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
                {selectedItem && (
                    <>
                        {/* --- HERO HEADER --- */}
                        <div className="modal-hero" style={{ 
                            background: `linear-gradient(135deg, ${selectedItem.color || '#66ff99'}22 0%, rgba(0,0,0,0) 100%)`, 
                            borderBottom: `1px solid ${selectedItem.color || '#66ff99'}44` 
                        }}>
                            <div className="modal-hero__content">
                                {selectedItem.logo && <img src={selectedItem.logo} alt="" className="expanded-card-logo" />}
                                <h2>{selectedItem.title}</h2>
                                <p className="expanded-card-subtitle">{selectedItem.company || selectedItem.institution} • {selectedItem.location}</p>
                            </div>
                        </div>

                        <div className="modal-body">
                            {/* --- DASHBOARD --- */}
                            <div className="stats-grid">
                                <div className="stat-box">
                                    <span className="stat-label">Période</span>
                                    <span className="stat-value">{selectedItem.period}</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-label">Type</span>
                                    <span className="stat-value">{selectedItem.type === 'experience' ? 'Expérience' : 'Formation'}</span>
                                </div>
                            </div>

                            {/* --- DESCRIPTION & DÉTAILS --- */}
                            <div className="tech-section">
                                {selectedItem.description && <p className="project-full-desc">{selectedItem.description}</p>}
                                
                                {selectedItem.details && (
                                    <>
                                        <div className="tech-stack">
                                            <h4>Technologies Clés</h4>
                                            <div className="project-tags large">
                                                {selectedItem.details.tech.map(t => <span key={t} className="tag">{t}</span>)}
                                            </div>
                                        </div>
                                        <div className="tech-stack" style={{marginTop: '2rem'}}>
                                            <h4>Points Marquants</h4>
                                            <ul className="highlights-list">
                                                {selectedItem.details.highlights.map((h, i) => <li key={i}><span>✓</span> {h}</li>)}
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
