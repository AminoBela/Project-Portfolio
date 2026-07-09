import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Menu, X } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';
import type { TranslationKey } from '../../types/content';
import { EASE_OUT } from '../../utils/motion';
import './Navigation.css';

interface NavigationProps {
  activeSection: string;
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  onLanguageChange: (lng: string) => void;
}

const NAV_LINKS: ReadonlyArray<{ id: string; labelKey: TranslationKey }> = [
  { id: 'about', labelKey: 'nav_about' },
  { id: 'parcours', labelKey: 'nav_experience' },
  { id: 'competences', labelKey: 'nav_skills' },
  { id: 'projets', labelKey: 'nav_projects' },
  { id: 'contact', labelKey: 'nav_contact' },
];

const LANGUAGES = ['fr', 'en', 'es'] as const;

const underlineSpring = { type: 'spring', stiffness: 400, damping: 34 } as const;

export default function Navigation({
  activeSection,
  theme,
  toggleTheme,
  onLanguageChange,
}: NavigationProps) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setIsScrolled(y > 8);
        // La barre s'efface en descendant, réapparaît dès qu'on remonte
        setIsHidden(y > lastY && y > 140);
        lastY = y;
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const currentLang = i18n.resolvedLanguage ?? i18n.language;

  return (
    <motion.header
      className={`site-nav ${isScrolled ? 'is-scrolled' : ''}`}
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: isHidden && !isMenuOpen ? '-100%' : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      <nav className="site-nav__inner site-container">
        <a href="#accueil" className="site-nav__logo" onClick={() => setIsMenuOpen(false)}>
          AB<span className="site-nav__logo-dot">.</span>
        </a>

        <motion.ul
          className="site-nav__links"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
          }}
        >
          {NAV_LINKS.map(({ id, labelKey }) => {
            const isActive = activeSection === id;
            return (
              <motion.li
                key={id}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
                }}
              >
                <a href={`#${id}`} className={isActive ? 'is-active' : ''}>
                  {t(labelKey)}
                  {isActive && (
                    <motion.span
                      className="site-nav__underline"
                      layoutId="nav-active"
                      transition={underlineSpring}
                    />
                  )}
                </a>
              </motion.li>
            );
          })}
        </motion.ul>

        <div className="site-nav__actions">
          <div className="site-nav__langs" role="group" aria-label="Langue">
            {LANGUAGES.map((lng) => (
              <button
                key={lng}
                className={currentLang === lng ? 'is-active' : ''}
                onClick={() => onLanguageChange(lng)}
                aria-pressed={currentLang === lng}
              >
                {currentLang === lng && (
                  <motion.span
                    className="site-nav__lang-pill"
                    layoutId="lang-active"
                    transition={underlineSpring}
                  />
                )}
                <span>{lng.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <button
            className="site-nav__icon-btn"
            onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })}
            aria-label={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            className="site-nav__icon-btn site-nav__burger"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? t('nav_close_menu') : t('nav_open_menu')}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {/* Progression de lecture le long de la hairline */}
      {!prefersReducedMotion && (
        <motion.span
          className="site-nav__progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      )}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="site-nav__panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: {},
              }}
            >
              {[{ id: 'accueil', labelKey: 'nav_home' as TranslationKey }, ...NAV_LINKS].map(
                ({ id, labelKey }) => (
                  <motion.li
                    key={id}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: 12 },
                    }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    <a
                      href={`#${id}`}
                      className={activeSection === id ? 'is-active' : ''}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(labelKey)}
                    </a>
                  </motion.li>
                )
              )}
            </motion.ul>

            <div className="site-nav__panel-langs" role="group" aria-label="Langue">
              {LANGUAGES.map((lng) => (
                <button
                  key={lng}
                  className={currentLang === lng ? 'is-active' : ''}
                  onClick={() => onLanguageChange(lng)}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
