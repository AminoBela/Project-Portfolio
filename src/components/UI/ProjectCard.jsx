import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import ReactMarkdown from 'react-markdown';
import { childVariants } from '../../utils/framerMotionVariants';

// Couleurs officielles GitHub pour les langages
const LANGUAGE_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4F5D95',
    Vue: '#41b883',
    React: '#61dafb',
    Shell: '#89e051',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Go: '#00ADD8',
    Ruby: '#701516',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
};

function getLangColor(lang) {
    return LANGUAGE_COLORS[lang] || '#66ff99'; // Vert par défaut
}

function shorten(text, limit = 150) {
    if (!text) return null;
    if (text.length <= limit) return text;
    return `${text.slice(0, limit - 3)}...`;
}

function formatDate(iso, locale = 'fr-FR') {
    if (!iso) return '';
    try {
        const date = new Date(iso);
        return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(date);
    } catch {
        return '';
    }
}

// J'ajoute ...props pour récupérer "layout" et autres props d'animation
function ProjectCard({ project, t, ...props }) {
    const [modalOpen, setModalOpen] = useState(false);
    const formattedDescription = shorten(project.description);
    // Utiliser la locale actuelle pour la date si possible, sinon par défaut fr-FR
    // i18next expose la langue actuelle via i18n.language, mais ici on a juste t.
    // On peut supposer que le formatage de date natif s'adapte ou on peut passer la locale.
    // Pour simplifier, on laisse le formatage par défaut ou on pourrait passer i18n.language si on l'avait.
    const updatedAt = formatDate(project.updated_at);
    const languages = Object.keys(project.languages || {});
    const mainLanguage = project.language || 'Code';
    const mainColor = getLangColor(mainLanguage);

    // Image favicon ou fallback
    const projectImage = project.homepage
        ? `https://www.google.com/s2/favicons?domain=${project.homepage}&sz=64`
        : null;

    return (
        <>
            <motion.div
                variants={childVariants}
                // Hover géré par CSS uniquement
                className="project-card"
                style={{ '--accent-color': mainColor }}
                {...props} // On applique les props ici (ex: layout)
            >
                <div className="project-card__header">
                    {projectImage ? (
                        <img src={projectImage} alt="" className="project-card__icon" />
                    ) : (
                        <div className="project-card__icon-placeholder" style={{ backgroundColor: mainColor }}>
                            {mainLanguage[0]}
                        </div>
                    )}
                    <div className="project-card__header-text">
                        <h3 className="project-card__title">{project.name}</h3>
                        <span className="project-card__subtitle" style={{ color: mainColor }}>{mainLanguage}</span>
                    </div>
                </div>

                <p className="project-card__description">
                    {formattedDescription || t('project_no_desc')}
                </p>

                <div className="project-tags">
                    {languages.slice(0, 3).map((lang) => (
                        <span key={lang} className="tag" style={{ borderColor: getLangColor(lang), color: getLangColor(lang) }}>
                            {lang}
                        </span>
                    ))}
                    {languages.length > 3 && <span className="tag">+{languages.length - 3}</span>}
                </div>

                <div className="project-card__footer">
                    <div className="project-stats">
                        <span title="Stars">★ {project.stargazers_count}</span>
                        <span title="Forks">⑂ {project.forks_count}</span>
                    </div>
                    <Button
                        onClick={() => setModalOpen(true)}
                        className="project-card__cta"
                        style={{ borderColor: mainColor, color: mainColor }}
                    >
                        {t('project_explore')}
                    </Button>
                </div>
            </motion.div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {/* --- HERO HEADER --- */}
                <div className="modal-hero" style={{
                    background: `linear-gradient(135deg, ${mainColor}22 0%, rgba(0,0,0,0) 100%)`,
                    borderBottom: `1px solid ${mainColor}44`
                }}>
                    <div className="modal-hero__content">
                        <span className="modal-hero__badge" style={{ backgroundColor: mainColor, color: '#000' }}>
                            {mainLanguage}
                        </span>
                        <h2>{project.name}</h2>
                        <div className="modal-hero__actions">
                            <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="btn-github">
                                GitHub ↗
                            </a>
                            {project.homepage && (
                                <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="btn-demo" style={{ color: mainColor, borderColor: mainColor }}>
                                    Live Demo ↗
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    {/* --- DASHBOARD STATS --- */}
                    <div className="stats-grid">
                        <div className="stat-box">
                            <span className="stat-label">Stars</span>
                            <span className="stat-value">★ {project.stargazers_count}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Forks</span>
                            <span className="stat-value">⑂ {project.forks_count}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">{t('project_updated')}</span>
                            <span className="stat-value">{updatedAt}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">{t('project_size')}</span>
                            <span className="stat-value">{Math.round(project.size / 1024)} Mo</span>
                        </div>
                    </div>

                    {/* --- DESCRIPTION & TECH --- */}
                    <div className="tech-section">
                        {project.description && (
                            <p className="project-full-desc">{project.description}</p>
                        )}

                        <div className="tech-stack">
                            <h4>{t('project_stack')}</h4>
                            <div className="project-tags large">
                                {languages.map((lang) => (
                                    <span key={lang} className="tag" style={{
                                        backgroundColor: `${getLangColor(lang)}15`,
                                        color: getLangColor(lang),
                                        borderColor: `${getLangColor(lang)}40`
                                    }}>
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- README --- */}
                    <div className="markdown-body">
                        <div className="readme-header">
                            <h3>README.md</h3>
                            <div className="readme-line"></div>
                        </div>
                        <ReactMarkdown>{project.readmeContent || t('project_no_readme')}</ReactMarkdown>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default ProjectCard;
