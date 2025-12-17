import React, { useState, useMemo } from 'react';
import { skills } from '../../data/skillsData';
import SkillBar from '../UI/SkillBar';
import { motion, AnimatePresence } from 'framer-motion';

function TechnologiesSection() {
    const groupedSkills = useMemo(() => {
        const order = [
            'Frontend & UI',
            'Backend & Langages',
            'Ops & Infra',
            'Data & SGBD'
        ];
        const buckets = skills.reduce((acc, skill) => {
            const key = skill.category || 'Autres';
            acc[key] = acc[key] || [];
            acc[key].push(skill);
            return acc;
        }, {});

        return Object.entries(buckets)
            .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
            .map(([category, items]) => ({
                category,
                items: items.sort((a, b) => b.level - a.level)
            }));
    }, []);

    const [activeTab, setActiveTab] = useState(groupedSkills[0]?.category);

    const activeSkills = useMemo(() => {
        return groupedSkills.find(group => group.category === activeTab)?.items || [];
    }, [activeTab, groupedSkills]);

    // Variants pour l'animation des cartes
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: 'easeOut'
            }
        }),
        exit: (i) => ({
            opacity: 0,
            y: -20,
            transition: {
                delay: i * 0.03,
                duration: 0.2,
                ease: 'easeIn'
            }
        })
    };

    return (
        <>
            <h2 className="terminal-command" style={{ marginTop: '2.2rem' }}>&gt; Technologies</h2>
            <div className="skills-legend">
                <span><span className="legend-dot legend-dot--expert" />Expert</span>
                <span><span className="legend-dot legend-dot--advanced" />Avancé</span>
                <span><span className="legend-dot legend-dot--confirmed" />Confirmé</span>
                <span><span className="legend-dot legend-dot--progress" />En progression</span>
            </div>

            <div className="skills-tabs">
                {groupedSkills.map(({ category }) => (
                    <button
                        key={category}
                        className={`skills-tab ${activeTab === category ? 'skills-tab--active' : ''}`}
                        onClick={() => setActiveTab(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <motion.div className="skills-grid-wide">
                <AnimatePresence mode="wait">
                    {activeSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name} // La clé doit être unique pour l'animation
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <SkillBar skill={skill} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
}

export default TechnologiesSection;
