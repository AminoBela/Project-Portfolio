import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useScrollspy } from './hooks/useScrollspy';
import Navigation from './components/Layout/Navigation';
import HomeSection from './components/Sections/HomeSection';
import AboutSection from './components/Sections/AboutSection';
import Footer from "./components/Layout/Footer";
import CustomCursor from "./components/UI/CustomCursor";
import ScrollProgressBar from './components/UI/ScrollProgressBar';
import ScrollToTop from './components/UI/ScrollToTop';
import { navVariants } from './utils/framerMotionVariants';

// --- LAZY LOADING ---
const ExperienceEducationSection = React.lazy(() => import('./components/Sections/ExperienceEducationSection'));
const SkillsSection = React.lazy(() => import('./components/Sections/SkillsSection'));
const ProjectsSection = React.lazy(() => import('./components/Sections/ProjectsSection'));
const ContactSection = React.lazy(() => import('./components/Sections/ContactSection'));

// --- Composant de chargement ---
const LoadingFallback = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <p className="terminal-text">Chargement...</p>
    </div>
);

function App() {
    const { theme, toggleTheme } = useTheme();
    const { activeSection, isMenuOpen, toggleMenu, setIsMenuOpen } = useScrollspy();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <CustomCursor />
            <ScrollProgressBar />
            <div className="site-background">
                <div className="orb orb--1" />
                <div className="orb orb--2" />
                <div className="orb orb--3" />
                <div className="hero-grid" />
                <div className="scanline" />
            </div>

            <div>
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    className={`main-nav ${isScrolled ? 'main-nav--scrolled' : ''}`}
                >
                    <Navigation
                        activeSection={activeSection}
                        isMenuOpen={isMenuOpen}
                        toggleMenu={toggleMenu}
                        toggleTheme={toggleTheme}
                        theme={theme}
                        isScrolled={isScrolled}
                        onNavLinkClick={() => setIsMenuOpen(false)}
                    />
                </motion.nav>

                <main>
                    <HomeSection />
                    <AboutSection />
                    <Suspense fallback={<LoadingFallback />}>
                        <ExperienceEducationSection />
                        <SkillsSection />
                        <ProjectsSection />
                        <ContactSection />
                    </Suspense>
                </main>
                <Footer />
            </div>
            <ScrollToTop />
        </>
    );
}

export default App;
