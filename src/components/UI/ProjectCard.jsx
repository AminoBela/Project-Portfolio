import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import { childVariants } from '../../utils/framerMotionVariants'; // Assure-toi que childVariants est bien défini

function ProjectCard({ project }) {
  // Ajout de console.log pour voir si les données de projet sont reçues par la carte
  // console.log("Rendering ProjectCard for:", project.name, project.description, project.html_url); 
  // Décommente si tu veux vérifier que chaque carte reçoit bien ses données

  return (
    <motion.div
      variants={childVariants} // Applique Framer Motion aux cartes individuelles
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Rend la détection plus souple
      className="project-card terminal-card"
    >
      <h3 className="terminal-text project-card__title">{project.name}</h3>
      <p className="terminal-text project-card__description">
        {project.description || 'Pas de description fournie.'} {/* Message plus explicite */}
      </p>
      <Button href={project.html_url} target="_blank" rel="noopener noreferrer" primary>
        &gt; Voir sur GitHub
      </Button>
    </motion.div>
  );
}

export default ProjectCard;
