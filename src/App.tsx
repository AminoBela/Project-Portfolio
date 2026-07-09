import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import { useScrollspy } from './hooks/useScrollspy';
import { useLenis } from './hooks/useLenis';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import Statement from './components/sections/Statement';
import About from './components/sections/About';
import Footer from './components/layout/Footer';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import Scrollbar from './components/ui/Scrollbar';

// Lazy load des sections below-the-fold
const Journey = lazy(() => import('./components/sections/Journey'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Projects = lazy(() => import('./components/sections/Projects'));
const InternshipModal = lazy(() => import('./components/ui/InternshipModal'));

const SectionFallback = () => <div style={{ minHeight: '200px' }} />;

const PAGE_TITLES: Record<string, string> = {
  fr: 'Amin Belalia | Portfolio',
  en: 'Amin Belalia | Portfolio',
  es: 'Amin Belalia | Portafolio',
};

function App() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection } = useScrollspy();
  const { i18n } = useTranslation();
  useLenis();

  const [isLangFading, setIsLangFading] = useState(false);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = PAGE_TITLES[i18n.language] ?? 'Amin Belalia | Portfolio';
  }, [i18n.language]);

  // Le fond de page dérive doucement selon la section traversée
  useEffect(() => {
    document.body.dataset.section = activeSection;
  }, [activeSection]);

  // Changement de langue : simple fondu du contenu (~300ms aller-retour)
  const handleLanguageChange = useCallback(
    (lng: string) => {
      if (i18n.language === lng) return;
      setIsLangFading(true);
      window.setTimeout(() => {
        void i18n.changeLanguage(lng);
        window.setTimeout(() => setIsLangFading(false), 50);
      }, 160);
    },
    [i18n]
  );

  const handleOpenInternshipModal = useCallback(() => setIsInternshipModalOpen(true), []);
  const closeInternshipModal = useCallback(() => setIsInternshipModalOpen(false), []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#accueil" className="skip-link">
        Skip to content
      </a>

      <Navigation
        activeSection={activeSection}
        toggleTheme={toggleTheme}
        theme={theme}
        onLanguageChange={handleLanguageChange}
      />

      <main className={isLangFading ? 'lang-fading' : undefined}>
        <Hero onOpenInternshipModal={handleOpenInternshipModal} />
        <Statement />
        <About onOpenInternshipModal={handleOpenInternshipModal} />
        <Suspense fallback={<SectionFallback />}>
          <Journey />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTopButton />
      <Scrollbar />

      <Suspense fallback={null}>
        <InternshipModal isOpen={isInternshipModalOpen} onClose={closeInternshipModal} />
      </Suspense>
    </MotionConfig>
  );
}

export default App;
