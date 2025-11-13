import React from 'react';

export default function SkillBar({ skill }) {
    const level = Math.max(0, Math.min(skill.level ?? 0, 100));
    const indicatorPosition = `${level}%`;

    return (
        <div className="skill-bar-container">
            <div className="skill-bar-label">
                {skill.icon && (
                    <img src={skill.icon} alt={skill.name} className="skill-logo" loading="lazy" />
                )}
                <span>{skill.name}</span>
            </div>
            <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: indicatorPosition }} />
                <span
                    className="skill-bar-indicator"
                    style={{ left: indicatorPosition }}
                >
                    {level}%
                </span>
            </div>
        </div>
    );
}

