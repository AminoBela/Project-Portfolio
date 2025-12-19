import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import { useScrollspy } from './hooks/useScrollspy';
import Navigation from './components/Layout/Navigation';
import HomeSection from './components/Sections/HomeSection';
import AboutSection from './components/Sections/AboutSection';
import ExperienceEducationSection from './components/Sections/ExperienceEducationSection';
import SkillsSection from './components/Sections/SkillsSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import ContactSection from './components/Sections/ContactSection'; // Importation
import Footer from "./components/Layout/Footer";
import CustomCursor from "./components/UI/CustomCursor";
import { navVariants } from './utils/framerMotionVariants';

// Composant de chargement simple
const LoadingScreen = () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#10141a', 
      color: '#66ff99',
      fontFamily: 'monospace',
      fontSize: '1.5rem'
    }}>
      Chargement...
    </div>
);

function App() {
    const { t, i18n } = useTranslation();
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

    if (!i18n.isInitialized) {
        return <LoadingScreen />;
    }

    return (
        <>
            <CustomCursor />
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
                        onNavLinkClick={() => setIsMenuOpen(false)}
                    />
                </motion.nav>

                <main>
                    <HomeSection />
                    <AboutSection />
                    <ExperienceEducationSection />
                    <SkillsSection />
                    <ProjectsSection />
                    <ContactSection /> {/* Ajout de la section Contact */}
                </main>
                <Footer />
            </div>
        </>
    );
}

export default App;
