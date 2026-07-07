import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Star, GitFork, ArrowUpRight } from 'lucide-react';
import type { ProjectWithDetails } from '../../types/github';
import { getProjectMedia, getLangColor } from '../../utils/projectMedia';
import './ProjectCard.css';

interface ProjectCardProps {
  project: ProjectWithDetails;
  onSelect: (id: number) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const { t } = useTranslation();
  const media = getProjectMedia(project.name);

  return (
    <motion.article
      className="pcard"
      layoutId={`project-${project.id}`}
      style={{ borderRadius: 16 }}
      onClick={() => onSelect(project.id)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
    >
      {media && (
        <motion.div
          className="pcard__media"
          layoutId={`project-media-${project.id}`}
          style={{ borderRadius: 10 }}
        >
          <img
            src={media.type === 'video' ? (media.poster ?? '') : media.url}
            alt=""
            loading="lazy"
          />
        </motion.div>
      )}

      <div className="pcard__body">
        <motion.h3 className="pcard__title" layoutId={`project-title-${project.id}`}>
          {project.name}
        </motion.h3>

        <p className="pcard__desc">{project.description ?? t('project_no_desc')}</p>

        <footer className="pcard__footer">
          {project.language && (
            <span className="pcard__lang">
              <span
                className="pcard__lang-dot"
                style={{ background: getLangColor(project.language) }}
                aria-hidden="true"
              />
              {project.language}
            </span>
          )}
          <span className="pcard__stat">
            <Star size={13} aria-hidden="true" /> {project.stargazers_count}
          </span>
          <span className="pcard__stat">
            <GitFork size={13} aria-hidden="true" /> {project.forks_count}
          </span>
          <ArrowUpRight size={15} className="pcard__arrow" aria-hidden="true" />
        </footer>
      </div>
    </motion.article>
  );
}
