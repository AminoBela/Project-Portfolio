// src/components/Sections/ProjectsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../UI/ProjectCard';
import { useGithubRepos } from '../../hooks/useGithubRepos';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

function ProjectsSection() {
  const { projects, loading, error } = useGithubRepos('AminoBela'); // VÉRIFIE TRÈS ATTENTIVEMENT CE NOM

  return (
    <motion.section
      id="projets"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="terminal-section"
    >
      <div className="container">
        <motion.h2 variants={childVariants} className="terminal-command">
          &gt; Mes projets
        </motion.h2>
        {loading && <p className="terminal-text loading-message">Chargement des projets...</p>}
        {error && <p className="terminal-text error-message">{error}</p>}
        {!loading && !error && projects.length === 0 && (
          <p className="terminal-text no-projects">
            Aucun projet public trouvé.
            <br />
            (Vérifiez votre nom d'utilisateur GitHub "AminoBela",
            <br />
            assurez-vous d'avoir des dépôts publics,
            <br />
            ou que le quota de l'API GitHub n'est pas atteint.)
          </p>
        )}
        {!loading && !error && projects.length > 0 && (
          <motion.div variants={sectionVariants} className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default ProjectsSection;
