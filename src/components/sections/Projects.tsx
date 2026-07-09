import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Section from '../ui/Section';
import Reveal from '../ui/Reveal';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import { useGithubRepos } from '../../hooks/useGithubRepos';
import { EASE_OUT } from '../../utils/motion';
import './Projects.css';

const PROJECTS_PER_PAGE = 6;

function SkeletonCard() {
  return (
    <div className="pskeleton" aria-hidden="true">
      <div className="pskeleton__media" />
      <div className="pskeleton__line pskeleton__line--title" />
      <div className="pskeleton__line" />
      <div className="pskeleton__line pskeleton__line--short" />
    </div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const { projects, loading, error } = useGithubRepos('AminoBela');
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectFilter = (key: string) => {
    setActiveFilter(key);
    setCurrentPage(1);
  };

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      if (project.language) {
        counts.set(project.language, (counts.get(project.language) ?? 0) + 1);
      }
    }
    const sorted = [...counts.entries()].sort(([a], [b]) => a.localeCompare(b));
    return [['All', projects.length] as const, ...sorted];
  }, [projects]);

  const filtered = useMemo(
    () =>
      activeFilter === 'All'
        ? projects
        : projects.filter((project) => project.language === activeFilter),
    [projects, activeFilter]
  );

  const totalPages = Math.ceil(filtered.length / PROJECTS_PER_PAGE);
  const pageProjects = filtered.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const selectedProject = projects.find((project) => project.id === selectedId);

  return (
    <Section id="projets" title={t('projects_title')}>
      {loading && (
        <div className="projects__grid" aria-busy="true" aria-label={t('projects_loading')}>
          {Array.from({ length: 6 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {error && <p className="projects__error">{error}</p>}

      {!loading && !error && projects.length > 0 && (
        <>
          <Reveal>
            <div className="projects__filters" role="group" aria-label={t('projects_filter_all')}>
              {categories.map(([key, count]) => (
                <button
                  key={key}
                  className={activeFilter === key ? 'is-active' : ''}
                  onClick={() => selectFilter(key)}
                >
                  {key === 'All' ? t('projects_filter_all') : key}
                  <span className="projects__filter-count">{count}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div
            className="projects__grid"
            key={`${activeFilter}-${currentPage}`}
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            {pageProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
                }}
              >
                <ProjectCard project={project} onSelect={setSelectedId} />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && <p className="projects__error">{t('projects_not_found')}</p>}

          {totalPages > 1 && (
            <div className="projects__pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={currentPage === page ? 'is-active' : ''}
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </Section>
  );
}
