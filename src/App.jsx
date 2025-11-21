import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useScrollspy } from './hooks/useScrollspy';
import Navigation from './components/Layout/Navigation';
import HomeSection from './components/Sections/HomeSection';
import AboutSection from './components/Sections/AboutSection';
import SkillsSection from './components/Sections/SkillsSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import StageSection from "./components/Sections/StageSection.jsx";
import Footer from "./components/Layout/Footer";
import CustomCursor from "./components/UI/CustomCursor";
import { navVariants } from './utils/framerMotionVariants';

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
                    <SkillsSection />
                    <StageSection />
                    <ProjectsSection />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default App;
