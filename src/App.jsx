import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import ScrollToTopButton from "./components/UI/ScrollToTopButton";
import { navVariants } from './utils/framerMotionVariants';

// --- CONSTANTES ---
const BOOT_TEXT = [
    "> INITIALIZING KERNEL...",
    "> LOADING MODULES: REACT, VITE, FRAMER_MOTION...",
    "> MOUNTING VIRTUAL DOM...",
    "> CHECKING NETWORK INTERFACES... [OK]",
    "> LOADING ASSETS... [OK]",
    "> CONFIGURING LOCALES (FR, EN, ES)... [OK]",
    "> STARTING PORTFOLIO_V1.0 SERVICE...",
    "> ACCESS GRANTED."
];

// --- COMPOSANT DE DÉMARRAGE (ROBUSTE & BEAU) ---
const InitialBootScreen = ({ onComplete }) => {
    const [displayedLines, setDisplayedLines] = useState([]);
    const [progress, setProgress] = useState(0);
    
    // Refs pour gérer l'animation sans dépendre des re-rendus
    const lineIndexRef = useRef(0);
    const lastTimeRef = useRef(Date.now());
    const progressRef = useRef(0);
    const animationFrameRef = useRef(null);

    const animate = useCallback(() => {
        const now = Date.now();
        const deltaTime = now - lastTimeRef.current;

        // Animation du texte (toutes les 400ms environ)
        if (deltaTime > 400 && lineIndexRef.current < BOOT_TEXT.length) {
            setDisplayedLines(prev => [...prev, BOOT_TEXT[lineIndexRef.current]]);
            lineIndexRef.current++;
            lastTimeRef.current = now;
        }

        // Animation de la barre de progression (plus fluide)
        if (progressRef.current < 100) {
            progressRef.current += 0.8; // Vitesse de progression
            setProgress(Math.min(100, progressRef.current));
        }

        // Condition de fin
        if (lineIndexRef.current >= BOOT_TEXT.length && progressRef.current >= 100) {
            // Petit délai avant de fermer pour lire la dernière ligne
            setTimeout(onComplete, 600);
            return; // Stop l'animation
        }

        animationFrameRef.current = requestAnimationFrame(animate);
    }, [onComplete]);

    useEffect(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [animate]);

    return (
        <motion.div
            className="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            onClick={onComplete} // Cliquer n'importe où pour passer
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#0a0c10',
                color: '#66ff99',
                fontFamily: "'Fira Code', monospace",
                zIndex: 10000,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                overflow: 'hidden',
                cursor: 'pointer' // Indique qu'on peut cliquer
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
                    {displayedLines.map((line, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ 
                                marginBottom: '0.5rem', 
                                fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                                color: index === displayedLines.length - 1 ? '#fff' : '#66ff99',
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
                    <span>{Math.floor(progress)}%</span>
                </div>
                
                {/* Indication pour passer */}
                <div style={{ 
                    position: 'absolute', 
                    bottom: '-30px', 
                    right: 0, 
                    fontSize: '0.7rem', 
                    color: '#444',
                    opacity: 0.7 
                }}>
                    [TAP TO SKIP]
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
                inset: 0,
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

    // --- SEO & ACCESSIBILITÉ ---
    useEffect(() => {
        document.documentElement.lang = i18n.language;
        const titles = {
            fr: 'Amin Belalia | Portfolio',
            en: 'Amin Belalia | Portfolio',
            es: 'Amin Belalia | Portafolio'
        };
        document.title = titles[i18n.language] || 'Amin Belalia | Portfolio';
    }, [i18n.language]);

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

    // Utilisation de useCallback pour stabiliser la fonction et éviter le redémarrage de l'effet
    const handleBootComplete = useCallback(() => {
        setIsBootSequenceFinished(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Sécurité : Forcer la fin du boot après 8 secondes max (un peu plus long car l'animation est plus lente)
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            if (!isBootSequenceFinished) {
                console.warn("Boot sequence timed out, forcing completion.");
                setIsBootSequenceFinished(true);
            }
        }, 8000);
        return () => clearTimeout(safetyTimer);
    }, [isBootSequenceFinished]);

    // On affiche l'écran de boot tant que l'animation n'est pas finie OU que i18n n'est pas prêt
    const showBootScreen = !isBootSequenceFinished || !i18n.isInitialized;

    return (
        <>
            <CustomCursor />
            
            <AnimatePresence mode="wait">
                {showBootScreen && (
                    <InitialBootScreen onComplete={handleBootComplete} />
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
                        <ScrollToTopButton />
                    </div>
                </motion.div>
            )}
        </>
    );
}

export default App;
