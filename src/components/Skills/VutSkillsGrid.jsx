import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { vutSkills } from '../../data/vutSkills';

function VutSkillsGrid() {
    const { t } = useTranslation();

    return (
        <>
            <h2 className="terminal-command">{t('skills_vut_title')}</h2>
            <p className="skills-section__intro">{t('skills_vut_intro')}</p>

            <div className="competency-grid">
                {vutSkills.map((skill, idx) => (
                    <motion.article
                        key={idx}
                        className="competency-card"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: idx * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <header className="competency-card__head">
                            <span className="competency-card__icon" aria-hidden="true">
                                <i className={skill.icon} />
                            </span>
                            <span className={`competency-card__level competency-card__level--${skill.level.split('_').pop()}`}>
                                {t(skill.level)}
                            </span>
                        </header>

                        <h3 className="competency-card__title">{t(skill.name)}</h3>
                        <p className="competency-card__comment">{t(skill.comment)}</p>

                        {skill.github && (
                            <a
                                href={skill.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="competency-card__link"
                            >
                                <i className="fa-brands fa-github" />
                                {t('skills_vut_project_button')}
                                <span aria-hidden="true">↗</span>
                            </a>
                        )}
                    </motion.article>
                ))}
            </div>
        </>
    );
}

export default VutSkillsGrid;
