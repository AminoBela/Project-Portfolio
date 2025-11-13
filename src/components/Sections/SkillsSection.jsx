import React, { useMemo } from 'react';
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

    return (
        <section id="competences" className="skills-section terminal-section">
            <div className="container">
                <h2 className="terminal-command">&gt; Compétences BUT</h2>
                <div className="skills-cards-grid">
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
                <div className="skills-groups">
                    {groupedSkills.map(({ category, items }) => (
                        <section key={category} className="skills-group">
                            <header className="skills-group__header">
                                <h3>{category}</h3>
                                <span>{items.length} technos</span>
                            </header>
                            <div className="skills-grid-wide">
                                {items.map((skill) => (
                                    <SkillBar key={skill.name} skill={skill} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default SkillsSection;