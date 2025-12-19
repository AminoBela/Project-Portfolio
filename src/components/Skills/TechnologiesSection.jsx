import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { skills } from '../../data/skillsData';
import SkillBar from '../UI/SkillBar';
import { motion, AnimatePresence } from 'framer-motion';

function TechnologiesSection() {
    const { t } = useTranslation();

    const categoryOrder = [
        'Systèmes & Réseaux',
        'Virtualisation & Services',
        'Dév & Web'
    ];

    const categoryKeys = {
        'Systèmes & Réseaux': 'skills_cat_sysnet',
        'Virtualisation & Services': 'skills_cat_virt_services',
        'Dév & Web': 'skills_cat_dev_web'
    };

    const groupedSkills = useMemo(() => {
        const buckets = skills.reduce((acc, skill) => {
            const key = skill.category || 'Autres';
            acc[key] = acc[key] || [];
            acc[key].push(skill);
            return acc;
        }, {});

        return categoryOrder
            .map(category => ({
                category,
                items: (buckets[category] || []).sort((a, b) => b.level - a.level)
            }))
            .filter(group => group.items.length > 0);
    }, []);

    const [activeTab, setActiveTab] = useState(groupedSkills[0]?.category);

    const activeSkills = useMemo(() => {
        return groupedSkills.find(group => group.category === activeTab)?.items || [];
    }, [activeTab, groupedSkills]);

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
            <h2 className="terminal-command" style={{ marginTop: '2.2rem' }}>&gt; {t('technologies_title')}</h2>
            <div className="skills-legend">
                <span><span className="legend-dot legend-dot--expert" />{t('legend_expert')}</span>
                <span><span className="legend-dot legend-dot--advanced" />{t('legend_advanced')}</span>
                <span><span className="legend-dot legend-dot--confirmed" />{t('legend_confirmed')}</span>
                <span><span className="legend-dot legend-dot--progress" />{t('legend_progress')}</span>
            </div>

            <div className="skills-tabs">
                {groupedSkills.map(({ category }) => (
                    <button
                        key={category}
                        className={`skills-tab ${activeTab === category ? 'skills-tab--active' : ''}`}
                        onClick={() => setActiveTab(category)}
                    >
                        {t(categoryKeys[category])}
                    </button>
                ))}
            </div>

            <motion.div className="skills-grid-wide">
                <AnimatePresence mode="wait">
                    {activeSkills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <SkillBar skill={skill} t={t} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
}

export default TechnologiesSection;
