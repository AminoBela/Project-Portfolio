import React, { useEffect, useRef } from 'react';
import { vutSkills } from '../../data/vutSkills';
import Button from '../UI/Button';

function VutSkillsGrid() {
    const gridRef = useRef(null);

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
    }, []);

    return (
        <>
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
        </>
    );
}

export default VutSkillsGrid;
