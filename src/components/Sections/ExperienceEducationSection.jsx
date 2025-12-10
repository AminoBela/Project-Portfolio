import React from 'react';
import { timelineData } from '../../data/experienceEducationData';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

const TimelineItem = ({ item, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            className={`timeline-item ${item.type} ${isEven ? 'left' : 'right'}`}
            variants={childVariants}
        >
            <div className="timeline-content">
                <div className="timeline-logo-wrapper">
                    {item.logo ? (
                        <img src={item.logo} alt={item.company || item.institution} className="timeline-logo" />
                    ) : (
                        <i className={`fa-solid ${item.type === 'experience' ? 'fa-briefcase' : 'fa-graduation-cap'} timeline-logo-icon`}></i>
                    )}
                </div>
                <div className="timeline-text">
                    <span className="timeline-period">{item.period}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-meta">
                        {item.type === 'experience' ? item.company : item.institution} - {item.location}
                    </p>
                    <p className="timeline-description">{item.description}</p>
                </div>
            </div>
        </motion.div>
    );
};

function ExperienceEducationSection() {
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
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </motion.section>
    );
}

export default ExperienceEducationSection;
