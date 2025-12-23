import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import { useScrollspy } from './hooks/useScrollspy';
import { useKonamiCode } from './hooks/useKonamiCode';
import Navigation from './components/Layout/Navigation';
import HomeSection from './components/Sections/HomeSection';
import AboutSection from './components/Sections/AboutSection';
import ExperienceEducationSection from './components/Sections/ExperienceEducationSection';
import SkillsSection from './components/Sections/SkillsSection';
import ContactSection from './components/Sections/ContactSection';
import Footer from "./components/Layout/Footer";
import CustomCursor from "./components/UI/CustomCursor";
import ScrollToTopButton from "./components/UI/ScrollToTopButton";
import InternshipBanner from "./components/UI/InternshipBanner";
import BootScreen from "./components/UI/BootScreen";
import LanguageTransitionOverlay from "./components/UI/LanguageTransitionOverlay";
import { navVariants } from './utils/framerMotionVariants';

// Lazy Loading
const ProjectsSection = React.lazy(() => import('./components/Sections/ProjectsSection'));
const InternshipModal = React.lazy(() => import('./components/UI/InternshipModal'));
const MatrixRain = React.lazy(() => import('./components/UI/MatrixRain'));

// Composant MainContent mémorisé
const MainContent = React.memo(({ onOpenInternshipModal, bannerHeight }) => {
    return (
        <main style={{ paddingTop: bannerHeight, transition: 'padding-top 0.5s ease' }}>
            <HomeSection />
            <AboutSection onOpenInternshipModal={onOpenInternshipModal} />
            <ExperienceEducationSection />
            <SkillsSection />
            <Suspense fallback={<div style={{ height: '300px' }}></div>}>
                <ProjectsSection />
            </Suspense>
            <ContactSection />
        </main>
    );
});

function App() {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { activeSection, isMenuOpen, toggleMenu, setIsMenuOpen } = useScrollspy();
    const { isTriggered: isMatrixMode, setIsTriggered: setIsMatrixMode } = useKonamiCode();
    
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLangSwitching, setIsLangSwitching] = useState(false);
    const [isBootSequenceFinished, setIsBootSequenceFinished] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
    const [isBannerVisible, setIsBannerVisible] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        document.documentElement.lang = i18n.language;
        const titles = {
            fr: 'Amin Belalia | Portfolio',
            en: 'Amin Belalia | Portfolio',
            es: 'Amin Belalia | Portafolio'
        };
        document.title = titles[i18n.language] || 'Amin Belalia | Portfolio';
    }, [i18n.language]);

    useEffect(() => {
        console.log(
            "%c👋 Hey Dev! Looking for secrets? Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A",
            "color: #66ff99; font-family: monospace; font-size: 14px; background: #10141a; padding: 10px; border-radius: 5px;"
        );
    }, []);

    const handleLanguageChange = (lng) => {
        if (i18n.language === lng) return;
        setIsLangSwitching(true);
        setTimeout(() => {
            i18n.changeLanguage(lng);
            setTimeout(() => {
                setIsLangSwitching(false);
            }, 800);
        }, 500);
    };

    const handleBootComplete = useCallback(() => {
        setIsBootSequenceFinished(true);
    }, []);

    const handleOpenInternshipModal = useCallback(() => {
        setIsInternshipModalOpen(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 50;
            setIsScrolled(prev => {
                if (prev !== scrolled) return scrolled;
                return prev;
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsBootSequenceFinished(true);
        }
    }, [isMobile]);

    const showBootScreen = !isBootSequenceFinished && i18n.isInitialized && !isMobile;
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
            
            <AnimatePresence mode="wait">
                {showBootScreen && (
                    <BootScreen onComplete={handleBootComplete} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLangSwitching && <LanguageTransitionOverlay key="lang-overlay" />}
            </AnimatePresence>

            {(isBootSequenceFinished || isMobile) && (
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
                            onClose={() => setIsBannerVisible(false)}
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
                                onClose={() => setIsInternshipModalOpen(false)} 
                            />
                        </Suspense>
                    </div>
                </motion.div>
            )}
        </>
    );
}

export default App;
