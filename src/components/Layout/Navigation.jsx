import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggleButton from './ThemeToggleButton';

function Navigation({ activeSection, toggleTheme, theme, onLanguageChange, bannerHeight }) {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const desktopLinks = [
        { href: '#about', label: t('nav_about') },
        { href: '#parcours', label: t('nav_experience') },
        { href: '#engagements', label: t('nav_engagements') },
        { href: '#competences', label: t('nav_skills') },
        { href: '#projets', label: t('nav_projects') },
        { href: '#hobbies', label: t('nav_hobbies') },
        { href: '#contact', label: t('nav_contact') },
    ];

    const mobileLinks = [
        { href: '#accueil', label: t('nav_home') },
        ...desktopLinks
    ];

    const changeLanguage = (lng) => {
        if (onLanguageChange) {
            onLanguageChange(lng);
        } else {
            i18n.changeLanguage(lng);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNavLinkClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    const mobileMenuVariants = {
        closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
        open: { opacity: 1, height: 'calc(100dvh - 60px)', transition: { duration: 0.3 } }
    };

    const linkContainerVariants = {
        closed: { opacity: 0 },
        open: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.1 }
        }
    };

    const linkItemVariants = {
        closed: { opacity: 0, y: 10 },
        open: { opacity: 1, y: 0 }
    };

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div 
            className="navbar-wrapper"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            layout
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ '--banner-height': bannerHeight || '0px' }}
        >
            <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isMenuOpen ? 'navbar--menu-open' : ''}`}>
            {/* HEADER CONTAINER */}
            <div className="navbar__container">
                <a href="#accueil" className={`navbar__logo ${activeSection === 'accueil' ? 'is-active' : ''}`} data-cursor="pointer" onClick={handleNavLinkClick}>
                    <span style={{ position: 'relative', zIndex: 1 }}>AB</span>
                    {(activeSection === 'accueil' || !activeSection) && (
                        <motion.div layoutId="nav-indicator-desktop" className="navbar__indicator" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                    )}
                </a>

                {/* DESKTOP LINKS */}
                <ul className="navbar__desktop-links">
                    {desktopLinks.map(link => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <li key={link.href} className="navbar__desktop-item">
                                <a href={link.href} className={`navbar__link ${isActive ? 'is-active' : ''}`} data-cursor="pointer">
                                    <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
                                </a>
                                {isActive && (
                                    <motion.div layoutId="nav-indicator-desktop" className="navbar__indicator" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* ACTIONS */}
                <div className="navbar__actions">
                    <div className="navbar__lang-selector">
                        <button onClick={() => changeLanguage('fr')} className={i18n.language === 'fr' ? 'active' : ''}>FR</button>
                        <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>EN</button>
                        <button onClick={() => changeLanguage('es')} className={i18n.language === 'es' ? 'active' : ''}>ES</button>
                    </div>
                    <ThemeToggleButton toggleTheme={toggleTheme} theme={theme} />
                    
                    {/* BURGER BUTTON (MOBILE) */}
                    <button className={`navbar__burger ${isMenuOpen ? 'is-active' : ''}`} onClick={toggleMenu} aria-label={t('nav_open_menu')}>
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        className="navbar__mobile-menu"
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="navbar__mobile-content">
                            <motion.ul 
                                className="navbar__mobile-links"
                                variants={linkContainerVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                {mobileLinks.map(link => {
                                    const isActive = activeSection === link.href.substring(1);
                                    return (
                                        <motion.li key={link.href} variants={linkItemVariants} className="navbar__mobile-item">
                                            <a href={link.href} className={`navbar__mobile-link ${isActive ? 'is-active' : ''}`} onClick={handleNavLinkClick}>
                                                {link.label}
                                            </a>
                                            {isActive && (
                                                <motion.div layoutId="nav-indicator-mobile" className="navbar__mobile-indicator" />
                                            )}
                                        </motion.li>
                                    );
                                })}
                            </motion.ul>
                            
                            <div className="navbar__mobile-lang">
                                <button onClick={() => changeLanguage('fr')} className={i18n.language === 'fr' ? 'active' : ''}>FR</button>
                                <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>EN</button>
                                <button onClick={() => changeLanguage('es')} className={i18n.language === 'es' ? 'active' : ''}>ES</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </nav>
        </motion.div>
    );
}

export default Navigation;
