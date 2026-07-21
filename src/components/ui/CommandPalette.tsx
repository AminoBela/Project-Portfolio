import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  House,
  User,
  Briefcase,
  Layers,
  FolderGit2,
  Mail,
  FileText,
  Sun,
  Moon,
  Languages,
  Copy,
  Check,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import { EASE_OUT } from '../../utils/motion';
import type { Theme } from '../../hooks/useTheme';
import cvPdf from '../../assets/cv.pdf';
import './CommandPalette.css';

const EMAIL = 'abelaliabendjafar@gmail.com';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  toggleTheme: () => void;
  onLanguageChange: (lng: string) => void;
}

interface Action {
  id: string;
  label: string;
  icon: LucideIcon | typeof GitHubIcon;
  external?: boolean;
  run: () => void | 'keep-open';
}

export default function CommandPalette({
  isOpen,
  onClose,
  theme,
  toggleTheme,
  onLanguageChange,
}: CommandPaletteProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const actions = useMemo<Action[]>(() => {
    const go = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView();
    };
    const open = (url: string) => () => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    return [
      { id: 'accueil', label: t('nav_home'), icon: House, run: go('accueil') },
      { id: 'about', label: t('nav_about'), icon: User, run: go('about') },
      { id: 'parcours', label: t('nav_experience'), icon: Briefcase, run: go('parcours') },
      { id: 'competences', label: t('nav_skills'), icon: Layers, run: go('competences') },
      { id: 'projets', label: t('nav_projects'), icon: FolderGit2, run: go('projets') },
      { id: 'contact', label: t('nav_contact'), icon: Mail, run: go('contact') },
      { id: 'cv', label: t('home_btn_cv'), icon: FileText, external: true, run: open(cvPdf) },
      {
        id: 'theme',
        label: theme === 'dark' ? t('palette_theme_light') : t('palette_theme_dark'),
        icon: theme === 'dark' ? Sun : Moon,
        run: () => toggleTheme(),
      },
      {
        id: 'email',
        label: t('palette_copy_email'),
        icon: Copy,
        run: () => {
          void navigator.clipboard.writeText(EMAIL);
          setCopied(true);
          window.setTimeout(onClose, 800);
          return 'keep-open';
        },
      },
      {
        id: 'github',
        label: 'GitHub',
        icon: GitHubIcon,
        external: true,
        run: open('https://github.com/AminoBela'),
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        icon: LinkedInIcon,
        external: true,
        run: open('https://linkedin.com/in/amin-belalia-bendjafar-8b340a227'),
      },
      { id: 'lang-fr', label: 'Français', icon: Languages, run: () => onLanguageChange('fr') },
      { id: 'lang-en', label: 'English', icon: Languages, run: () => onLanguageChange('en') },
      { id: 'lang-es', label: 'Español', icon: Languages, run: () => onLanguageChange('es') },
    ];
  }, [t, theme, toggleTheme, onLanguageChange, onClose]);

  const normalize = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  const filtered = useMemo(
    () => actions.filter((a) => normalize(a.label).includes(normalize(query))),
    [actions, query]
  );

  // Réinitialisation de l'état à l'ouverture (ajustée pendant le rendu,
  // évite un setState synchrone dans l'effet)
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setQuery('');
      setSelected(0);
      setCopied(false);
    }
  }

  // Focus + verrouillage du scroll pendant l'ouverture
  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const execute = (action: Action) => {
    const result = action.run();
    if (result !== 'keep-open') onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter') {
      const action = filtered[selected];
      if (action) execute(action);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="palette__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label={t('palette_open')}
            data-lenis-prevent
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <input
              ref={inputRef}
              className="palette__input"
              type="text"
              placeholder={t('palette_placeholder')}
              aria-label={t('palette_placeholder')}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(0);
              }}
            />
            <ul className="palette__list" role="listbox">
              {filtered.length === 0 && <li className="palette__empty">{t('palette_empty')}</li>}
              {filtered.map((action, i) => {
                const Icon = action.id === 'email' && copied ? Check : action.icon;
                return (
                  <li key={action.id} role="option" aria-selected={i === selected}>
                    <button
                      className={`palette__item ${i === selected ? 'is-selected' : ''}`}
                      onClick={() => execute(action)}
                      onMouseEnter={() => setSelected(i)}
                    >
                      <Icon size={16} aria-hidden="true" />
                      {action.id === 'email' && copied ? t('palette_copied') : action.label}
                      {action.external && (
                        <ArrowUpRight size={13} className="palette__ext" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="palette__foot" aria-hidden="true">
              <span>↑↓</span>
              <span>↵</span>
              <span>esc</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
