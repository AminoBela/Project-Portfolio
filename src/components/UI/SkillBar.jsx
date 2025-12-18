import React from 'react';

function getLevelLabel(level) {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Avancé';
    if (level >= 60) return 'Confirmé';
    if (level >= 45) return 'Intermédiaire';
    return 'En progression';
}

export default function SkillBar({ skill, style }) {
    const level = Math.max(0, Math.min(skill.level ?? 0, 100));
    const indicatorPosition = `${level}%`;
    const levelLabel = getLevelLabel(level);

    return (
        <article className="skill-card" style={style}>
            <header className="skill-card__header">
                <div className="skill-card__identity">
                    {skill.icon && (
                        <div 
                            className="skill-logo-mask"
                            style={{
                                maskImage: `url(${skill.icon})`,
                                WebkitMaskImage: `url(${skill.icon})`,
                            }}
                        ></div>
                    )}
                    <div>
                        <h4 className="skill-card__name">{skill.name}</h4>
                    </div>
                </div>
                <span className={`skill-card__level skill-card__level--${levelLabel.toLowerCase().replace(' ', '-')}`}>
                    {levelLabel}
                </span>
            </header>
            
            {skill.description && (
                <p className="skill-card__description">
                    {skill.description}
                </p>
            )}

            <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: indicatorPosition }} />
            </div>
        </article>
    );
}
