import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import { useScrollspy } from './hooks/useScrollspy';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import HomeSection from './components/Sections/HomeSection';
import AboutSection from './components/Sections/AboutSection';
import ScrollToTopButton from './components/UI/ScrollToTopButton';
import InternshipBanner from './components/UI/InternshipBanner';

// Lazy load des sections below-the-fold
const ExperienceEducationSection = lazy(
  () => import('./components/Sections/ExperienceEducationSection')
);
const SkillsSection = lazy(() => import('./components/Sections/SkillsSection'));
const EngagementsSection = lazy(() => import('./components/Sections/EngagementsSection'));
const HobbiesSection = lazy(() => import('./components/Sections/HobbiesSection'));
const ContactSection = lazy(() => import('./components/Sections/ContactSection'));
const ProjectsSection = lazy(() => import('./components/Sections/ProjectsSection'));
const InternshipModal = lazy(() => import('./components/UI/InternshipModal'));

const SectionFallback = () => <div style={{ minHeight: '200px' }} />;

const PAGE_TITLES: Record<string, string> = {
  fr: 'Amin Belalia | Portfolio',
  en: 'Amin Belalia | Portfolio',
  es: 'Amin Belalia | Portafolio',
};

const BANNER_DISMISSED_KEY = 'banner_dismissed';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection } = useScrollspy();
  const { i18n } = useTranslation();

  const [isLangFading, setIsLangFading] = useState(false);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(
    () => localStorage.getItem(BANNER_DISMISSED_KEY) !== 'true'
  );

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

  const closeBanner = useCallback(() => {
    setIsBannerVisible(false);
    localStorage.setItem(BANNER_DISMISSED_KEY, 'true');
  }, []);

  const bannerHeight = isBannerVisible ? '50px' : '0px';

  return (
    <>
      <a href="#accueil" className="skip-link">
        Skip to content
      </a>

      <InternshipBanner
        isVisible={isBannerVisible}
        onClose={closeBanner}
        onOpenModal={handleOpenInternshipModal}
      />

      <Navigation
        activeSection={activeSection}
        toggleTheme={toggleTheme}
        theme={theme}
        onLanguageChange={handleLanguageChange}
        bannerHeight={bannerHeight}
      />

      <main
        className={isLangFading ? 'lang-fading' : undefined}
        style={{ paddingTop: bannerHeight }}
      >
        <HomeSection />
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
    </>
  );
}

export default App;
