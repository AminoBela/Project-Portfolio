import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ThemeToggleButton from './ThemeToggleButton';

const menuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -20 },
    open: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: { 
            type: 'spring', 
            stiffness: 300, 
            damping: 30,
            staggerChildren: 0.08,
            delayChildren: 0.15
        } 
    }
};

const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200 } }
};

const overlayVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function Navigation({ activeSection, toggleTheme, theme }) {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '#accueil', label: t('nav_home') },
        { href: '#about', label: t('nav_about') },
        { href: '#parcours', label: t('nav_experience') },
        { href: '#competences', label: t('nav_skills') },
        { href: '#projets', label: t('nav_projects') },
        { href: '#contact', label: t('nav_contact') },
    ];

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleNavLinkClick = () => {
        if (isMenuOpen) {
            toggleMenu();
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    return (
        <>
            <nav className="main-nav">
                <div className="nav-header">
                    <a href="#accueil" className="main-nav__logo-link" data-cursor="pointer">
                        <div className="main-nav__logo">AB</div>
                    </a>

                    <ul className="main-nav__list--desktop">
                        {navLinks.map(link => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <li key={link.href} style={{ position: 'relative' }}>
                                    <a href={link.href} className={`main-nav__link ${isActive ? 'is-active' : ''}`} onClick={handleNavLinkClick} data-cursor="pointer">
                                        {link.label}
                                        {isActive && (
                                            <motion.div layoutId="nav-highlight" className="nav-highlight" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="main-nav__actions">
                        <div className="language-selector">
                            <button onClick={() => changeLanguage('fr')} className={i18n.language === 'fr' ? 'active' : ''}>FR</button>
                            <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>EN</button>
                            <button onClick={() => changeLanguage('es')} className={i18n.language === 'es' ? 'active' : ''}>ES</button>
                        </div>
                        <ThemeToggleButton toggleTheme={toggleTheme} theme={theme} />
                        <button className={`main-nav__toggle ${isMenuOpen ? 'is-active' : ''}`} onClick={toggleMenu} aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} data-cursor="pointer">
                            <span className="burger-bar"></span>
                            <span className="burger-bar"></span>
                            <span className="burger-bar"></span>
                        </button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={toggleMenu}
                    >
                        <motion.div
                            className="main-nav__mobile-container"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ul className="main-nav__list--mobile">
                                {navLinks.map(link => (
                                    <motion.li key={link.href} variants={linkVariants}>
                                        <a href={link.href} className={`main-nav__link--mobile ${activeSection === link.href.substring(1) ? 'is-active' : ''}`} onClick={handleNavLinkClick} data-cursor="pointer">
                                            {link.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                            {/* Sélecteur de langue pour mobile */}
                            <div className="language-selector-mobile">
                                <button onClick={() => changeLanguage('fr')} className={i18n.language === 'fr' ? 'active' : ''}>FR</button>
                                <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>EN</button>
                                <button onClick={() => changeLanguage('es')} className={i18n.language === 'es' ? 'active' : ''}>ES</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navigation;
