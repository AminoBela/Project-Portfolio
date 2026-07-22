import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Menu, X, Command, Star } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';
import type { TranslationKey } from '../../types/content';
import { EASE_OUT } from '../../utils/motion';
import './Navigation.css';

interface NavigationProps {
  activeSection: string;
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  onLanguageChange: (lng: string) => void;
  onOpenPalette: () => void;
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

/** Toast éphémère : célébration au moment où on choisit l'espagnol. */
function EsCelebration({ show, label }: { show: boolean; label: string }) {
  return createPortal(
    <div className="lang-celebration__anchor">
      <AnimatePresence>
        {show && (
          <motion.div
            className="lang-celebration"
            role="status"
            initial={{ opacity: 0, y: -14, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          >
            <motion.span
              className="lang-celebration__flag"
              initial={{ rotate: -16 }}
              animate={{ rotate: [-16, 12, -8, 4, 0] }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              aria-hidden="true"
            >
              🇪🇸
            </motion.span>
            <span className="lang-celebration__text">{label}</span>
            <span className="lang-celebration__stars" aria-hidden="true">
              <Star size={11} fill="currentColor" strokeWidth={0} />
              <Star size={11} fill="currentColor" strokeWidth={0} />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}

export default function Navigation({
  activeSection,
  theme,
  toggleTheme,
  onLanguageChange,
  onOpenPalette,
}: NavigationProps) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [celebrateEs, setCelebrateEs] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 8);
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

  // Célébration ponctuelle au moment où l'espagnol est choisi (pas à l'arrivée sur le site)
  const prevLangRef = useRef(currentLang);
  useEffect(() => {
    const prev = prevLangRef.current;
    prevLangRef.current = currentLang;
    if (prev !== 'es' && currentLang === 'es') {
      setCelebrateEs(true);
      const timer = window.setTimeout(() => setCelebrateEs(false), 2200);
      return () => window.clearTimeout(timer);
    }
  }, [currentLang]);

  return (
    <motion.header
      className={`site-nav ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'is-open' : ''}`}
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
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
            className="site-nav__icon-btn site-nav__palette-btn"
            onClick={onOpenPalette}
            aria-label={t('palette_open')}
            title="Ctrl+K"
          >
            <Command size={16} />
          </button>

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

      <EsCelebration show={celebrateEs} label={t('lang_es_badge')} />
    </motion.header>
  );
}
