import React, { useState, useMemo, useEffect } from 'react';
import { skills } from '../../data/skillsData';
import SkillBar from '../UI/SkillBar';

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
    const [isAnimating, setIsAnimating] = useState(false);

    const activeSkills = useMemo(() => {
        return groupedSkills.find(group => group.category === activeTab)?.items || [];
    }, [activeTab, groupedSkills]);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, [activeTab]);

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

            <div className="skills-grid-wide">
                {activeSkills.map((skill, index) => (
                    <SkillBar
                        key={skill.name}
                        skill={skill}
                        style={{
                            animation: isAnimating
                                ? `fadeInUp 0.5s ${index * 0.05}s both`
                                : 'none'
                        }}
                    />
                ))}
            </div>
        </>
    );
}

export default TechnologiesSection;
