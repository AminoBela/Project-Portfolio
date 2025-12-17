import React, { useState, useRef, useEffect } from 'react';
import { timelineData } from '../../data/experienceEducationData';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

// --- Carte simplifiée pour la timeline ---
const TimelineCard = ({ item, onSelect, isSelected }) => (
    <motion.div
        layoutId={`card-container-${item.id}`}
        className="timeline-card-compact"
        onClick={() => onSelect(item.id)}
        variants={childVariants}
        initial={{ borderRadius: 12 }}
        style={{ opacity: isSelected ? 0 : 1 }}
        data-cursor="pointer"
    >
        <div className="timeline-card-compact-header">
            <i className={`fa-solid ${item.type === 'experience' ? 'fa-briefcase' : 'fa-graduation-cap'}`}></i>
            <motion.h3 layoutId={`card-title-${item.id}`} className="timeline-card-compact-title">{item.title}</motion.h3>
        </div>
        <motion.span layoutId={`card-period-${item.id}`} className="timeline-card-compact-period">{item.period}</motion.span>
    </motion.div>
);

// --- Carte détaillée qui s'affiche en grand ---
const ExpandedCard = ({ item, onDeselect }) => (
    <motion.div
        className="expanded-card-backdrop"
        onClick={onDeselect}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
    >
        <motion.div
            layoutId={`card-container-${item.id}`}
            className="expanded-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ borderRadius: 12 }}
        >
            <motion.div
                className="expanded-card-content-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                <div className="expanded-card-header">
                    {item.logo && (
                        <div className="expanded-card-logo-wrapper">
                            <img src={item.logo} alt={item.company || item.institution} className="expanded-card-logo" />
                        </div>
                    )}
                    <div className="expanded-card-header-text">
                        <motion.h3 layoutId={`card-title-${item.id}`} className="parcours-card-title">{item.title}</motion.h3>
                        <p className="parcours-card-meta">
                            {item.type === 'experience' ? item.company : item.institution} - {item.location}
                        </p>
                        <motion.span layoutId={`card-period-${item.id}`} className="parcours-card-period">{item.period}</motion.span>
                    </div>
                </div>

                <hr className="expanded-card-divider" />

                <div className="expanded-card-body">
                    <p className="parcours-card-description">{item.description}</p>
                    
                    {item.details && (
                        <div className="expanded-card-details">
                            <p>{item.details.intro}</p>
                            <div className="details-grid">
                                <div className="details-column">
                                    <h4>Technologies Clés</h4>
                                    <div className="tech-tags">
                                        {item.details.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                                    </div>
                                </div>
                                <div className="details-column">
                                    <h4>Points Marquants</h4>
                                    <ul className="highlights-list">
                                        {item.details.highlights.map((h, i) => <li key={i}><i className="fa-solid fa-check"></i> {h}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
            <button onClick={onDeselect} className="close-button" data-cursor="pointer">
                <i className="fa-solid fa-times"></i>
            </button>
        </motion.div>
    </motion.div>
);

// --- Composant principal de la section ---
function ExperienceEducationSection() {
    const [selectedId, setSelectedId] = useState(null);
    const timelineRef = useRef(null);
    const selectedItem = selectedId ? timelineData.find(item => item.id === selectedId) : null;

    useEffect(() => {
        const currentTimeline = timelineRef.current;
        if (!currentTimeline) return;

        let animationFrameId;

        const handleMouseMove = (e) => {
            if (animationFrameId) return;

            animationFrameId = requestAnimationFrame(() => {
                const cards = currentTimeline.querySelectorAll('.timeline-card-compact');
                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--x', `${x}px`);
                    card.style.setProperty('--y', `${y}px`);
                });
                animationFrameId = null;
            });
        };

        currentTimeline.addEventListener('mousemove', handleMouseMove);

        return () => {
            currentTimeline.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

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

                <div className="timeline-container" ref={timelineRef}>
                    {timelineData.map((item, index) => (
                        <div key={item.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                             <div className="timeline-icon-wrapper">
                                <i className={`fa-solid ${item.type === 'experience' ? 'fa-briefcase' : 'fa-graduation-cap'}`}></i>
                            </div>
                            <TimelineCard item={item} onSelect={setSelectedId} isSelected={selectedId === item.id} />
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <ExpandedCard item={selectedItem} onDeselect={() => setSelectedId(null)} />
                )}
            </AnimatePresence>
        </motion.section>
    );
}

export default ExperienceEducationSection;
