import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Signature scrubbée : zoom + fondu pilotés par l'approche du bas de page
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="site-container">
        <motion.p
          className="site-footer__name"
          style={prefersReducedMotion ? undefined : { scale, opacity, y }}
        >
          Amin Belalia
        </motion.p>

        <div className="site-footer__inner">
          <span className="site-footer__copy">
            © {new Date().getFullYear()} Amin Belalia. {t('footer_rights')}
          </span>
          <div className="site-footer__links">
            <a href="mailto:abelaliabendjafar@gmail.com" aria-label="Email">
              <Mail size={17} />
            </a>
            <a
              href="https://github.com/AminoBela"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href="https://linkedin.com/in/amin-belalia-bendjafar-8b340a227"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
