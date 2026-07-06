import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import { useScrollspy } from './hooks/useScrollspy';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import Footer from './components/Layout/Footer';
import AboutSection from './components/Sections/AboutSection';
import ScrollToTopButton from './components/UI/ScrollToTopButton';

// Lazy load des sections below-the-fold
const ExperienceEducationSection = lazy(
  () => import('./components/Sections/ExperienceEducationSection')
);
const SkillsSection = lazy(() => import('./components/Sections/SkillsSection'));
const EngagementsSection = lazy(() => import('./components/Sections/EngagementsSection'));
const HobbiesSection = lazy(() => import('./components/Sections/HobbiesSection'));
const ContactSection = lazy(() => import('./components/Sections/ContactSection'));
const ProjectsSection = lazy(() => import('./components/Sections/ProjectsSection'));
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

  const [isLangFading, setIsLangFading] = useState(false);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.title = PAGE_TITLES[i18n.language] ?? 'Amin Belalia | Portfolio';
  }, [i18n.language]);

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
        <AboutSection onOpenInternshipModal={handleOpenInternshipModal} />
        <Suspense fallback={<SectionFallback />}>
          <ExperienceEducationSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <EngagementsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <HobbiesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTopButton />

      <Suspense fallback={null}>
        <InternshipModal isOpen={isInternshipModalOpen} onClose={closeInternshipModal} />
      </Suspense>
    </MotionConfig>
  );
}

export default App;
