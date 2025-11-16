import React from 'react';

function getLevelLabel(level) {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Avancé';
    if (level >= 60) return 'Confirmé';
    if (level >= 45) return 'Intermédiaire';
    return 'En progression';
}

export default function SkillBar({ skill }) {
    const level = Math.max(0, Math.min(skill.level ?? 0, 100));
    const indicatorPosition = `${level}%`;
    const levelLabel = getLevelLabel(level);

    return (
        <article className="skill-card">
            <header className="skill-card__header">
                <div className="skill-card__identity">
                    {skill.icon && (
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            className="skill-logo"
                            loading="lazy"
                        />
                    )}
                    <div>
                        <h4 className="skill-card__name">{skill.name}</h4>
                        {skill.category && (
                            <span className="skill-card__badge">{skill.category}</span>
                        )}
                    </div>
            </div>
                <span className={`skill-card__level skill-card__level--${levelLabel.toLowerCase().replace(' ', '-')}`}>
                    {levelLabel}
                </span>
            </header>
            {skill.description && (
                <p className="skill-card__description">{skill.description}</p>
            )}
            <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: indicatorPosition }} />
                <span
                    className="skill-bar-indicator"
                    style={{ left: indicatorPosition }}
                >
                    {level}%
                </span>
            </div>
        </article>
    );
}

