import React, { useState, useMemo, useEffect, useRef } from 'react';
import { vutSkills } from '../../data/vutSkills';
import { skills } from '../../data/skillsData';
import SkillBar from '../UI/SkillBar';
import Button from '../UI/Button';
import './SkillsSection.css';

function SkillsSection() {
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
    const gridRef = useRef(null); // Ref pour la grille des compétences BUT

    const activeSkills = useMemo(() => {
        return groupedSkills.find(group => group.category === activeTab)?.items || [];
    }, [activeTab, groupedSkills]);

    useEffect(() => {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
    }, [activeTab]);

    // Effet de survol lumineux pour les cartes de compétences BUT
    useEffect(() => {
        const handleMouseMove = (e) => {
            const cards = gridRef.current.querySelectorAll('.skills-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--x', `${x}px`);
                card.style.setProperty('--y', `${y}px`);
            });
        };

        const currentGrid = gridRef.current;
        if (currentGrid) {
            currentGrid.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (currentGrid) {
                currentGrid.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []); // Le tableau de dépendances est vide pour n'attacher l'écouteur qu'une seule fois

    return (
        <section id="competences" className="skills-section terminal-section">
            <div className="container">
                <h2 className="terminal-command">&gt; Compétences BUT</h2>
                <div className="skills-cards-grid" ref={gridRef}>
                    {vutSkills.map((skill, idx) => (
                        <div key={idx} className="skills-card">
                            <div className="skills-card-title">{skill.name}</div>
                            <div className="skills-card-stars">
                                {Array.from({ length: 5 }).map((_, i) =>
                                    <span key={i} className={`star${i < skill.stars ? ' star--filled' : ''}`}>★</span>
                                )}
                            </div>
                            <div className="skills-card-comment">{skill.comment}</div>
                            <div className="skills-card-link">
                                {skill.github && skill.github.startsWith('http') ?
                                    <Button href={skill.github} target="_blank" secondary>Projet</Button>
                                    : <span className="skills-card-na">N/A</span>
                                }
                            </div>
                        </div>
                    ))}
                </div>
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
            </div>
        </section>
    );
}
export default SkillsSection;