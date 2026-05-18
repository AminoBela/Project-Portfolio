import { memo, useState } from 'react';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import ReactMarkdown from 'react-markdown';
import { useMagnetic } from '../../hooks/useMagnetic';

// Charge automatiquement tous les médias (images et vidéos) du dossier projets
const projectMediaModules = import.meta.glob('../../assets/projects/*.{png,jpg,jpeg,webp,mp4,webm}', { eager: true, query: '?url', import: 'default' });

const getProjectMedia = (repoName) => {
    const mediaPaths = Object.keys(projectMediaModules);
    const matchedPath = mediaPaths.find(path => {
        // Extrait le nom du fichier sans extension (ex: "../../assets/projects/mon-repo.mp4" -> "mon-repo")
        const filename = path.split('/').pop().split('.')[0];
        return filename === repoName;
    });
    
    if (matchedPath) {
        return {
            url: projectMediaModules[matchedPath],
            type: matchedPath.match(/\.(mp4|webm)$/i) ? 'video' : 'image'
        };
    }
    return null;
};

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
    return LANGUAGE_COLORS[lang] || '#818cf8';
}

function isLightColor(hex) {
    if (!hex || hex.length < 7) return false;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6;
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

function ProjectCard({ project, t, ...props }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const magnetRef = useMagnetic(0.06);
    const formattedDescription = shorten(project.description);
    const updatedAt = formatDate(project.updated_at);
    const languages = Object.keys(project.languages || {});
    const mainLanguage = project.language || 'Code';
    const mainColor = getLangColor(mainLanguage);

    const projectImage = project.homepage
        ? `https://www.google.com/s2/favicons?domain=${project.homepage}&sz=64`
        : null;

    const projectMedia = getProjectMedia(project.name);

    return (
        <>
            <div
                ref={magnetRef}
                className="project-card"
                style={{ '--accent-color': mainColor }}
                {...props}
            >
                {projectMedia && (
                    <div className="project-card__media-preview" aria-hidden="true">
                        {projectMedia.type === 'video' ? (
                            <video src={projectMedia.url} autoPlay loop muted playsInline />
                        ) : (
                            <img src={projectMedia.url} alt="" loading="lazy" />
                        )}
                    </div>
                )}

                <div className="project-card__header">
                    {projectImage ? (
                        <img src={projectImage} alt="" className="project-card__icon" loading="lazy" />
                    ) : (
                        <div className="project-card__icon-placeholder" style={{ backgroundColor: mainColor, color: isLightColor(mainColor) ? '#000' : '#fff' }}>
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
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
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
                    <div className="modal-tabs" role="tablist">
                        <button
                            type="button"
                            role="tab"
                            className={`modal-tab ${activeTab === 'overview' ? 'modal-tab--active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                            aria-selected={activeTab === 'overview'}
                        >
                            {t('project_tab_overview') || 'Overview'}
                        </button>
                        <button
                            type="button"
                            role="tab"
                            className={`modal-tab ${activeTab === 'tech' ? 'modal-tab--active' : ''}`}
                            onClick={() => setActiveTab('tech')}
                            aria-selected={activeTab === 'tech'}
                        >
                            {t('project_tab_tech') || 'Tech'}
                        </button>
                        <button
                            type="button"
                            role="tab"
                            className={`modal-tab ${activeTab === 'readme' ? 'modal-tab--active' : ''}`}
                            onClick={() => setActiveTab('readme')}
                            aria-selected={activeTab === 'readme'}
                        >
                            README
                        </button>
                    </div>

                    {activeTab === 'overview' && (
                        <>
                            {projectMedia && (
                                <div className="modal-media-container">
                                    {projectMedia.type === 'video' ? (
                                        <video src={projectMedia.url} autoPlay loop muted playsInline className="modal-media-element" />
                                    ) : (
                                        <img src={projectMedia.url} alt={`${project.name} overview`} className="modal-media-element" loading="lazy" />
                                    )}
                                </div>
                            )}

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

                            {project.description && (
                                <p className="project-full-desc">{project.description}</p>
                            )}
                        </>
                    )}

                    {activeTab === 'tech' && (
                        <div className="tech-section">
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
                    )}

                    {activeTab === 'readme' && (
                        <div className="markdown-body">
                            <ReactMarkdown>{project.readmeContent || t('project_no_readme')}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default memo(ProjectCard);
