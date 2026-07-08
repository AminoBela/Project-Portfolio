import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';
import { EASE_OUT } from '../../utils/motion';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="site-container">
        <motion.p
          className="site-footer__name"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
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
