import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useAppLogic } from './hooks/useAppLogic';
import { navVariants } from './utils/framerMotionVariants';
import Navigation from './components/Layout/Navigation';
import HomeSection from './components/Sections/HomeSection';
import AboutSection from './components/Sections/AboutSection';
import ExperienceEducationSection from './components/Sections/ExperienceEducationSection';
import SkillsSection from './components/Sections/SkillsSection';
import EngagementsSection from './components/Sections/EngagementsSection';
import HobbiesSection from './components/Sections/HobbiesSection';
import ContactSection from './components/Sections/ContactSection';
import Footer from "./components/Layout/Footer";
import CustomCursor from "./components/UI/CustomCursor";
import ScrollToTopButton from "./components/UI/ScrollToTopButton";
import InternshipBanner from "./components/UI/InternshipBanner";
import LanguageTransitionOverlay from "./components/UI/LanguageTransitionOverlay";

const ProjectsSection = React.lazy(() => import('./components/Sections/ProjectsSection'));
const InternshipModal = React.lazy(() => import('./components/UI/InternshipModal'));
const MatrixRain = React.lazy(() => import('./components/UI/MatrixRain'));
const TerminalMode = React.lazy(() => import('./components/UI/TerminalMode'));

const MainContent = React.memo(({ onOpenInternshipModal, bannerHeight }) => {
    return (
        <main style={{ paddingTop: bannerHeight, transition: 'padding-top 0.5s ease' }}>
            <HomeSection />
            <AboutSection onOpenInternshipModal={onOpenInternshipModal} />
            <ExperienceEducationSection />
            <EngagementsSection />
            <SkillsSection />
            <Suspense fallback={<div style={{ height: '300px' }}></div>}>
                <ProjectsSection />
            </Suspense>
            <HobbiesSection />
            <ContactSection />
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

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
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

                    <motion.nav
                        variants={navVariants}
                        initial="hidden"
                        animate="visible"
                        className={`main-nav ${isScrolled ? 'main-nav--scrolled' : ''}`}
                        layout
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        style={{ top: `calc(1rem + ${bannerHeight})`, transition: 'top 0.5s ease' }}
                    >
                        <Navigation
                            activeSection={activeSection}
                            isMenuOpen={isMenuOpen}
                            toggleMenu={toggleMenu}
                            toggleTheme={toggleTheme}
                            theme={theme}
                            onNavLinkClick={() => setIsMenuOpen(false)}
                            onLanguageChange={handleLanguageChange}
                        />
                    </motion.nav>

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
            </motion.div>
        </>
    );
}

export default App;
