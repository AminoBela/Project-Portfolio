import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../UI/ProjectCard';
import { useGithubRepos } from '../../hooks/useGithubRepos';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

function ProjectsSection() {
  const { projects, loading, error } = useGithubRepos('AminoBela');
  const [activeFilter, setActiveFilter] = useState('Tous');

  const categories = useMemo(() => {
    if (!projects) return ['Tous'];
    const langs = new Set(projects.map(p => p.language).filter(Boolean));
    return ['Tous', ...Array.from(langs).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Tous') return projects;
    return projects.filter(project => project.language === activeFilter);
  }, [projects, activeFilter]);

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

        {!loading && !error && projects.length > 0 && (
          <>
            {/* --- BARRE DE FILTRES --- */}
            <motion.div variants={childVariants} className="skills-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`skills-tab ${activeFilter === category ? 'skills-tab--active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* --- GRILLE DE PROJETS --- */}
            <div style={{ minHeight: '300px' }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        className="project-grid-inner"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {filteredProjects.map((project) => (
                            <ProjectCard 
                                key={project.id} 
                                project={project}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
              <p className="terminal-text">Aucun projet trouvé pour ce filtre.</p>
            )}
          </>
        )}
      </div>
    </motion.section>
  );
}

export default ProjectsSection;
