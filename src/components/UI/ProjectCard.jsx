import React from 'react';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
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
    const formattedDescription = shorten(project.description);
    const updatedAt = formatDate(project.updated_at);
    const topics = project.topics?.slice(0, 6) ?? [];

    return (
        <motion.div
            variants={childVariants}
            whileHover={{ translateY: -6 }}
            className="project-card"
        >
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

            {topics.length > 0 && (
                <div className="project-tags">
                    {topics.map((tag) => (
                        <span key={tag} className="tag">#{tag}</span>
                    ))}
                </div>
            )}

            <div className="project-card__footer">
                <div className="project-stats">
                    <span title="Stars GitHub">★ {project.stargazers_count ?? 0}</span>
                    <span title="Forks GitHub">⑂ {project.forks_count ?? 0}</span>
                </div>
                <Button
                    href={project.homepage || project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    primary
                    className="project-card__cta"
                >
                    &gt; Voir le projet
                </Button>
            </div>
        </motion.div>
    );
}

export default ProjectCard;
