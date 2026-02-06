import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../UI/ProjectCard';
import { useGithubRepos } from '../../hooks/useGithubRepos';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

function ProjectsSection() {
  const { t } = useTranslation();
  const { projects, loading, error } = useGithubRepos('AminoBela');
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const PROJECTS_PER_PAGE = 6;

  // Reset page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const categories = useMemo(() => {
    if (!projects) return ['All'];
    const langs = new Set(projects.map(p => p.language).filter(Boolean));
    return ['All', ...Array.from(langs).sort()];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(project => project.language === activeFilter);
  }, [projects, activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll léger vers le haut de la grille si nécessaire, ou pas pour garder le flow
    // document.getElementById('projets').scrollIntoView({ behavior: 'smooth' });
  };

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
          {t('projects_title')}
        </motion.h2>

        {loading && <p className="terminal-text loading-message">{t('projects_loading')}</p>}
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
                  {category === 'All' ? t('projects_filter_all') : category}
                </button>
              ))}
            </motion.div>

            {/* --- GRILLE DE PROJETS (Hauteur Min pour Stabilité) --- */}
            <div style={{ minHeight: '800px', display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage + activeFilter}
                  className="project-grid-inner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      t={t}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* --- PAGINATION CONTROLS --- */}
              {totalPages > 1 && (
                <div className="pagination-controls">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                      aria-label={`Page ${page}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {filteredProjects.length === 0 && (
              <p className="terminal-text">{t('projects_not_found')}</p>
            )}
          </>
        )}
      </div>
    </motion.section>
  );
}

export default ProjectsSection;
