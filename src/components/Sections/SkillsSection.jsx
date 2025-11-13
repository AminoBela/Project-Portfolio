import React from 'react';
import { vutSkills } from '../../data/vutSkills';
import { skills } from '../../data/skillsData';
import SkillBar from '../UI/SkillBar';
import Button from '../UI/Button';
import './SkillsSection.css';

function SkillsSection() {
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
                <div className="skills-grid-wide">
                    {skills.map(skill => (
                        <SkillBar key={skill.name} skill={skill} />
                    ))}
                </div>
            </div>
        </section>
    );
}
export default SkillsSection;