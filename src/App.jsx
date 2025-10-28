import React from 'react';
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

    return (
        <>
            <CustomCursor />
            <div>
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    className="main-nav"
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

                <HomeSection />
                <AboutSection />
                <SkillsSection />
                <StageSection />
                <ProjectsSection />
                <Footer />
            </div>
        </>
    );
}

export default App;