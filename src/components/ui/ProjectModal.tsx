import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { X, Star, GitFork, ExternalLink } from 'lucide-react';
import Button from './Button';
import type { ProjectWithDetails } from '../../types/github';
import { getProjectMedia, getLangColor, formatDate } from '../../utils/projectMedia';
import { MORPH_TRANSITION } from '../../utils/motion';
import './ProjectModal.css';

const ReactMarkdown = lazy(() => import('react-markdown'));

interface ProjectModalProps {
  project: ProjectWithDetails;
  onClose: () => void;
}

/** Panneau détaillé d'un projet — morph depuis la carte via layoutId partagés. */
export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t, i18n } = useTranslation();
  const media = getProjectMedia(project.name);
  const languages = Object.keys(project.languages);

  // Le README (parsing markdown) n'est monté qu'après le morph pour ne pas le saccader
  const [morphDone, setMorphDone] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setMorphDone(true), 480);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        className="pmodal__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      <div className="pmodal__wrap" onClick={onClose}>
        <motion.div
          className="pmodal"
          layoutId={`project-${project.id}`}
          style={{ borderRadius: 16 }}
          transition={{ layout: MORPH_TRANSITION }}
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
          data-lenis-prevent
          onClick={(e) => e.stopPropagation()}
        >
          <button className="pmodal__close" onClick={onClose} aria-label={t('banner_close')}>
            <X size={18} />
          </button>

          {media && (
            <motion.div
              className="pmodal__media"
              layoutId={`project-media-${project.id}`}
              style={{ borderRadius: 10 }}
              transition={{ layout: MORPH_TRANSITION }}
            >
              {/* Le poster assure la continuité visuelle du morph, la vidéo fond par-dessus */}
              <img
                src={media.type === 'video' ? (media.poster ?? '') : media.url}
                alt={`Aperçu de ${project.name}`}
                className="pmodal__media-base"
              />
              {media.type === 'video' && (
                <motion.video
                  className="pmodal__media-video"
                  src={media.url}
                  poster={media.poster}
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.35 } }}
                  exit={{ opacity: 0, transition: { duration: 0.08 } }}
                />
              )}
            </motion.div>
          )}

          <motion.h2
            className="pmodal__title"
            layoutId={`project-title-${project.id}`}
            transition={{ layout: MORPH_TRANSITION }}
          >
            {project.name}
          </motion.h2>

          <motion.div
            className="pmodal__content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.18, duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            <ul className="pmodal__meta">
              {project.language && (
                <li>
                  <span
                    className="pmodal__lang-dot"
                    style={{ background: getLangColor(project.language) }}
                    aria-hidden="true"
                  />
                  {project.language}
                </li>
              )}
              <li>
                <Star size={13} aria-hidden="true" /> {project.stargazers_count}
              </li>
              <li>
                <GitFork size={13} aria-hidden="true" /> {project.forks_count}
              </li>
              <li>
                {t('project_updated')} {formatDate(project.updated_at, i18n.language)}
              </li>
            </ul>

            {project.description && <p className="pmodal__desc">{project.description}</p>}

            <div className="pmodal__actions">
              <Button
                variant="primary"
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ExternalLink size={14} />
              </Button>
              {project.homepage && (
                <Button href={project.homepage} target="_blank" rel="noopener noreferrer">
                  Demo <ExternalLink size={14} />
                </Button>
              )}
            </div>

            {languages.length > 0 && (
              <>
                <h4 className="pmodal__heading">{t('project_stack')}</h4>
                <ul className="pmodal__stack">
                  {languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
              </>
            )}

            <h4 className="pmodal__heading">README</h4>
            <div className="pmodal__readme">
              {morphDone ? (
                <Suspense fallback={<p className="pmodal__desc">…</p>}>
                  <ReactMarkdown>{project.readmeContent || t('project_no_readme')}</ReactMarkdown>
                </Suspense>
              ) : (
                <p className="pmodal__desc">…</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
