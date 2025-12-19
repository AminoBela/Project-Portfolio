import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from './hooks/useTheme';
import { useScrollspy } from './hooks/useScrollspy';
import Navigation from './components/Layout/Navigation';
import HomeSection from './components/Sections/HomeSection';
import AboutSection from './components/Sections/AboutSection';
import ExperienceEducationSection from './components/Sections/ExperienceEducationSection';
import SkillsSection from './components/Sections/SkillsSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import ContactSection from './components/Sections/ContactSection';
import Footer from "./components/Layout/Footer";
import CustomCursor from "./components/UI/CustomCursor";
import { navVariants } from './utils/framerMotionVariants';

// --- COMPOSANT DE DÉMARRAGE (BOOT SEQUENCE) ---
const InitialBootScreen = ({ onComplete }) => {
    const [lines, setLines] = useState([]);
    const [progress, setProgress] = useState(0);

    const bootText = [
        "> INITIALIZING KERNEL...",
        "> LOADING MODULES: REACT, VITE, FRAMER_MOTION...",
        "> MOUNTING VIRTUAL DOM...",
        "> CHECKING NETWORK INTERFACES... [OK]",
        "> LOADING ASSETS... [OK]",
        "> CONFIGURING LOCALES (FR, EN, ES)... [OK]",
        "> STARTING PORTFOLIO_V1.0 SERVICE...",
        "> ACCESS GRANTED."
    ];

    useEffect(() => {
        let lineIndex = 0;
        
        // Animation des lignes de texte
        const textInterval = setInterval(() => {
            if (lineIndex < bootText.length) {
                setLines(prev => [...prev, bootText[lineIndex]]);
                lineIndex++;
            } else {
                clearInterval(textInterval);
                // Fin de l'animation
                setTimeout(onComplete, 800);
            }
        }, 300); // Vitesse d'apparition des lignes

        // Animation de la barre de progression
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 150);

        return () => {
            clearInterval(textInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                backgroundColor: '#0a0c10',
                color: '#66ff99',
                fontFamily: "'Fira Code', monospace",
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end', // Texte en bas comme un boot
                padding: '2rem',
                overflow: 'hidden'
            }}
        >
            {/* Scanlines effect */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                backgroundSize: '100% 2px, 3px 100%',
                pointerEvents: 'none',
                zIndex: 2
            }} />

            <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto 10vh auto', position: 'relative', zIndex: 3 }}>
                <div style={{ marginBottom: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    {lines.map((line, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ 
                                marginBottom: '0.5rem', 
                                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                                color: index === lines.length - 1 ? '#fff' : '#66ff99', // Dernière ligne blanche
                                textShadow: '0 0 5px rgba(102, 255, 153, 0.5)'
                            }}
                        >
                            {line}
                        </motion.div>
                    ))}
                </div>

                {/* Barre de progression */}
                <div style={{ width: '100%', height: '4px', background: '#333', marginTop: '1rem' }}>
                    <motion.div 
                        style={{ 
                            height: '100%', 
                            background: '#66ff99',
                            width: `${progress}%`,
                            boxShadow: '0 0 10px #66ff99'
                        }} 
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: '#888' }}>
                    <span>SYSTEM BOOT</span>
                    <span>{Math.min(100, Math.floor(progress))}%</span>
                </div>
            </div>
        </motion.div>
    );
};

// Composant de transition de langue (Style Cyberpunk/Terminal)
const LanguageTransitionOverlay = () => {
    const [text, setText] = useState('INITIALIZING...');
    
    useEffect(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
        let interval;
        let counter = 0;
        
        interval = setInterval(() => {
            setText(prev => prev.split('').map((char, index) => {
                if (index < counter) return 'SYSTEM_UPDATE_LANG...'.charAt(index);
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(''));
            
            counter += 1/2;
            if (counter > 20) clearInterval(interval);
        }, 30);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(16, 20, 26, 0.98)',
                backdropFilter: 'blur(20px)',
                zIndex: 9999,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#66ff99',
                fontFamily: "'Fira Code', monospace",
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ textAlign: 'center' }}
            >
                <div style={{ 
                    fontSize: '2rem', 
                    fontWeight: 'bold', 
                    marginBottom: '1rem',
                    textShadow: '0 0 10px rgba(102, 255, 153, 0.5)'
                }}>
                    {text}
                </div>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            style={{
                                width: '40px',
                                height: '6px',
                                background: '#333',
                                overflow: 'hidden'
                            }}
                        >
                            <motion.div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    background: '#66ff99',
                                    boxShadow: '0 0 8px #66ff99'
                                }}
                                initial={{ x: '-100%' }}
                                animate={{ x: '0%' }}
                                transition={{ 
                                    duration: 0.4, 
                                    delay: i * 0.1,
                                    ease: "circOut" 
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

function App() {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { activeSection, isMenuOpen, toggleMenu, setIsMenuOpen } = useScrollspy();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLangSwitching, setIsLangSwitching] = useState(false);
    
    // Nouvel état pour gérer la fin de l'animation de boot
    const [isBootSequenceFinished, setIsBootSequenceFinished] = useState(false);

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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // On affiche l'écran de boot tant que l'animation n'est pas finie OU que i18n n'est pas prêt
    const showBootScreen = !isBootSequenceFinished || !i18n.isInitialized;

    return (
        <>
            <CustomCursor />
            
            <AnimatePresence mode="wait">
                {showBootScreen && (
                    <InitialBootScreen onComplete={() => setIsBootSequenceFinished(true)} />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isLangSwitching && <LanguageTransitionOverlay key="lang-overlay" />}
            </AnimatePresence>

            {/* On n'affiche le contenu principal que lorsque le boot est fini */}
            {!showBootScreen && (
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
                        <motion.nav
                            variants={navVariants}
                            initial="hidden"
                            animate="visible"
                            className={`main-nav ${isScrolled ? 'main-nav--scrolled' : ''}`}
                            layout
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
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

                        <main>
                            <HomeSection />
                            <AboutSection />
                            <ExperienceEducationSection />
                            <SkillsSection />
                            <ProjectsSection />
                            <ContactSection />
                        </main>
                        <Footer />
                    </div>
                </motion.div>
            )}
        </>
    );
}

export default App;
