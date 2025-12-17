import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggleButton from './ThemeToggleButton';

const navLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#about', label: 'À propos' },
    { href: '#parcours', label: 'Parcours' },
    { href: '#competences', label: 'Compétences' },
    { href: '#projets', label: 'Projets' },
];

// Animation de la carte centrale
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

// Animation des liens
const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200 } }
};

const overlayVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

function Navigation({ activeSection, toggleTheme, theme }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navigation;
