import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useAppLogic } from './hooks/useAppLogic';
import { navVariants } from './utils/framerMotionVariants';
import Navigation from './components/Layout/Navigation';
import HomeSection from './components/Sections/HomeSection';
import AboutSection from './components/Sections/AboutSection';
import Footer from "./components/Layout/Footer";
import CustomCursor from "./components/UI/CustomCursor";
import ScrollToTopButton from "./components/UI/ScrollToTopButton";
import InternshipBanner from "./components/UI/InternshipBanner";
import LanguageTransitionOverlay from "./components/UI/LanguageTransitionOverlay";

// Lazy load des sections below-the-fold
const ExperienceEducationSection = React.lazy(() => import('./components/Sections/ExperienceEducationSection'));
const SkillsSection = React.lazy(() => import('./components/Sections/SkillsSection'));
const EngagementsSection = React.lazy(() => import('./components/Sections/EngagementsSection'));
const HobbiesSection = React.lazy(() => import('./components/Sections/HobbiesSection'));
const ContactSection = React.lazy(() => import('./components/Sections/ContactSection'));
const ProjectsSection = React.lazy(() => import('./components/Sections/ProjectsSection'));
const InternshipModal = React.lazy(() => import('./components/UI/InternshipModal'));
const MatrixRain = React.lazy(() => import('./components/UI/MatrixRain'));
const TerminalMode = React.lazy(() => import('./components/UI/TerminalMode'));

const SectionFallback = () => <div style={{ minHeight: '200px' }} />;

const MainContent = React.memo(({ onOpenInternshipModal, bannerHeight }) => {
    return (
        <main style={{ paddingTop: bannerHeight, transition: 'padding-top 0.5s ease' }}>
            <HomeSection />
            <AboutSection onOpenInternshipModal={onOpenInternshipModal} />
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
    );
});

function App() {
    const { theme, toggleTheme } = useTheme();
    const {
        isScrolled,
        isLangSwitching,
        isInternshipModalOpen,
        isBannerVisible,
        isMatrixMode,
        isTerminalOpen,
        activeSection,
        isMenuOpen,
        setIsMatrixMode,
        setIsMenuOpen,
        toggleMenu,
        handleLanguageChange,
        handleOpenInternshipModal,
        closeBanner,
        closeInternshipModal,
        closeTerminal
    } = useAppLogic();

    const bannerHeight = isBannerVisible ? '50px' : '0px';

    return (
        <>
            <CustomCursor isMatrixMode={isMatrixMode} />

            <AnimatePresence>
                {isMatrixMode && (
                    <Suspense fallback={null}>
                        <MatrixRain onClose={() => setIsMatrixMode(false)} />
                    </Suspense>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLangSwitching && <LanguageTransitionOverlay key="lang-overlay" />}
            </AnimatePresence>

            <div>
                <div className="site-background">
                    <div className="orb orb--1" />
                    <div className="orb orb--2" />
                    <div className="orb orb--3" />
                    <div className="hero-grid" />
                    <div className="scanline" />
                </div>

                <div>
                    <InternshipBanner
                        isVisible={isBannerVisible}
                        onClose={closeBanner}
                        onOpenModal={handleOpenInternshipModal}
                    />

                    <Navigation
                        activeSection={activeSection}
                        isMenuOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                        toggleTheme={toggleTheme}
                        theme={theme}
                        onNavLinkClick={() => setIsMenuOpen(false)}
                        onLanguageChange={handleLanguageChange}
                        bannerHeight={bannerHeight}
                    />

                    <MainContent
                        onOpenInternshipModal={handleOpenInternshipModal}
                        bannerHeight={bannerHeight}
                    />

                    <Footer />
                    <ScrollToTopButton />

                    <Suspense fallback={null}>
                        <InternshipModal
                            isOpen={isInternshipModalOpen}
                            onClose={closeInternshipModal}
                        />
                    </Suspense>

                    <Suspense fallback={null}>
                        <TerminalMode
                            isOpen={isTerminalOpen}
                            onClose={closeTerminal}
                            onMatrixMode={() => setIsMatrixMode(true)}
                        />
                    </Suspense>
                </div>
            </div>
        </>
    );
}

export default App;
