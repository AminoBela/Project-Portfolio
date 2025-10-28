import React from 'react';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
import { childVariants } from '../../utils/framerMotionVariants';

function ProjectCard({ project }) {
    return (
        <motion.div
            variants={childVariants}
            whileHover={{ scale: 1.05 }}
            className="project-card terminal-card"
        >
            {/* Ajoute une image si possible */}
            {project.image && (
                <img src={project.image} alt={project.name} className="project-image" />
            )}
            <h3 className="terminal-text project-card__title">{project.name}</h3>
            <p className="terminal-text project-card__description">
                {project.description || 'Pas de description fournie.'}
            </p>
            <div className="project-tags">
                {project.topics?.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
            <Button href={project.demo_url || project.html_url} target="_blank" rel="noopener noreferrer" primary>
                &gt; Voir le projet
            </Button>
        </motion.div>
    );
}

export default ProjectCard;