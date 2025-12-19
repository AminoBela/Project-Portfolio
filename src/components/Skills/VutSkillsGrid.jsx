import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { vutSkills } from '../../data/vutSkills';
import Button from '../UI/Button';

function VutSkillsGrid() {
    const { t } = useTranslation();
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
            <h2 className="terminal-command">&gt; {t('skills_vut_title')}</h2>
            <div className="skills-cards-grid" ref={gridRef}>
                {vutSkills.map((skill, idx) => (
                    <div key={idx} className="skills-card">
                        <div className="skills-card-title">{t(skill.name)}</div>
                        <div className="skills-card-stars">
                            {Array.from({ length: 5 }).map((_, i) =>
                                <span key={i} className={`star${i < skill.stars ? ' star--filled' : ''}`}>★</span>
                            )}
                        </div>
                        <div className="skills-card-comment">{t(skill.comment)}</div>
                        <div className="skills-card-link">
                            {skill.github && skill.github.startsWith('http') ?
                                <Button href={skill.github} target="_blank" secondary>{t('skills_vut_project_button')}</Button>
                                : <span className="skills-card-na">{t('skills_vut_na')}</span>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default VutSkillsGrid;
