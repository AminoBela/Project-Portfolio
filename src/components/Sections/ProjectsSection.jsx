import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import ProjectCard from '../UI/ProjectCard';
import ProjectCardSkeleton from '../UI/ProjectCardSkeleton';
import { useGithubRepos } from '../../hooks/useGithubRepos';
import { childVariants, staggeredCardVariants } from '../../utils/motion';

const PROJECTS_PER_PAGE = 6;

function ProjectsSection() {
  const { t } = useTranslation();
  const { projects, loading, error } = useGithubRepos('AminoBela');
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const categories = useMemo(() => {
    if (!projects || projects.length === 0) return [{ key: 'All', count: 0 }];
    const counts = projects.reduce((acc, p) => {
      if (p.language) acc[p.language] = (acc[p.language] || 0) + 1;
      return acc;
    }, {});
    const sorted = Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, count]) => ({ key, count }));
    return [{ key: 'All', count: projects.length }, ...sorted];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(project => project.language === activeFilter);
  }, [projects, activeFilter]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const viewKey = `${activeFilter}-${currentPage}`;

  return (
    <section id="projets" className="terminal-section">
      <div className="container">
        <motion.h2
          variants={childVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="terminal-command"
        >
          {t('projects_title')}
        </motion.h2>

        {loading && (
          <div className="project-grid-inner" aria-busy="true" aria-label={t('projects_loading')}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}
        {error && <p className="terminal-text error-message">{error}</p>}

        {!loading && !error && projects.length > 0 && (
          <>
            <motion.div
              className="skills-tabs"
              variants={childVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {categories.map(({ key, count }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`skills-tab ${activeFilter === key ? 'skills-tab--active' : ''}`}
                >
                  {key === 'All' ? t('projects_filter_all') : key}
                  <span className="skills-tab__count">{count}</span>
                </button>
              ))}
            </motion.div>

            <div className="project-grid-wrapper">
              <div className="project-grid-inner">
                <AnimatePresence mode="wait">
                  {currentProjects.map((project, index) => (
                    <motion.div
                      key={`${viewKey}-${project.id}`}
                      custom={index}
                      variants={staggeredCardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <ProjectCard project={project} t={t} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {totalPages > 1 && (
                <div className="pagination-controls">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
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
    </section>
  );
}

export default ProjectsSection;
