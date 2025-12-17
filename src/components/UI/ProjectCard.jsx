import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
import Modal from '../UI/Modal';
import ReactMarkdown from 'react-markdown';
import { childVariants } from '../../utils/framerMotionVariants';

function shorten(text, limit = 150) {
    if (!text) return 'Pas de description fournie.';
    if (text.length <= limit) return text;
    return `${text.slice(0, limit - 3)}...`;
}

function formatDate(iso) {
    if (!iso) return '';
    try {
        const date = new Date(iso);
        return new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric' }).format(date);
    } catch {
        return '';
    }
}

function ProjectCard({ project }) {
    const [modalOpen, setModalOpen] = useState(false);
    const formattedDescription = shorten(project.description);
    const updatedAt = formatDate(project.updated_at);
    const languages = Object.keys(project.languages || {});
    const projectImage = project.homepage ? `https://www.google.com/s2/favicons?domain=${project.homepage}` : null;

    return (
        <>
            <motion.div
                variants={childVariants}
                whileHover={{ translateY: -6 }}
                className="project-card"
            >
                {projectImage && <img src={projectImage} alt={project.name} className="project-card__image" />}
                <div className="project-card__meta">
                    <span className="project-card__language">{project.language || 'Multi-stack'}</span>
                    {updatedAt && (
                        <span className="project-card__date">MAJ {updatedAt}</span>
                    )}
                </div>

                <h3 className="project-card__title">{project.name}</h3>

                <p className="project-card__description">
                    {formattedDescription}
                </p>

                {languages.length > 0 && (
                    <div className="project-tags">
                        {languages.map((lang) => (
                            <span key={lang} className="tag">#{lang}</span>
                        ))}
                    </div>
                )}

                <div className="project-card__footer">
                    <div className="project-stats">
                        <span title="Stars GitHub">★ {project.stargazers_count ?? 0}</span>
                        <span title="Forks GitHub">⑂ {project.forks_count ?? 0}</span>
                    </div>
                    <Button
                        onClick={() => setModalOpen(true)}
                        primary
                        className="project-card__cta"
                    >
                        &gt; En savoir plus
                    </Button>
                </div>
            </motion.div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>{project.name}</h2>
                <ReactMarkdown>{project.readmeContent}</ReactMarkdown>
                <a href={project.html_url} target="_blank" rel="noopener noreferrer">Voir sur GitHub</a>
            </Modal>
        </>
    );
}

export default ProjectCard;
