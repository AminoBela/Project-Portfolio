import React from 'react';

const SkillBar = ({ skill, t }) => {
    // Fonction pour déterminer le libellé et la classe CSS du niveau
    const getLevelInfo = (level) => {
        if (level >= 85) return { label: 'legend_expert', css: 'expert' };
        if (level >= 75) return { label: 'legend_advanced', css: 'avancé' }; // Attention à l'accent dans le CSS
        if (level >= 60) return { label: 'legend_confirmed', css: 'confirmé' }; // Attention à l'accent dans le CSS
        return { label: 'legend_progress', css: 'en-progression' };
    };

    const { label, css } = getLevelInfo(skill.level);

    return (
        <div className="skill-card">
            <div className="skill-card__header">
                <div className="skill-card__identity">
                    {/* Utilisation de mask-image pour colorer l'icône avec --accent */}
                    <div 
                        className="skill-logo-mask" 
                        style={{ 
                            maskImage: `url(${skill.icon})`,
                            WebkitMaskImage: `url(${skill.icon})`
                        }} 
                    />
                    <h3 className="skill-card__name">{skill.name}</h3>
                </div>
                <span className={`skill-card__level skill-card__level--${css}`}>
                    {t ? t(label) : label}
                </span>
            </div>
            
            <p className="skill-card__description">
                {t ? t(skill.description) : skill.description}
            </p>
            
            <div className="skill-bar-track">
                <div 
                    className="skill-bar-fill" 
                    style={{ width: `${skill.level}%` }}
                ></div>
            </div>
        </div>
    );
};

export default SkillBar;
