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

const menuVariants = {
    closed: {
        x: '100%',
        transition: {
            type: 'tween',
            ease: [0.4, 0, 0.2, 1],
            duration: 0.5
        }
    },
    open: {
        x: '0%',
        transition: {
            type: 'tween',
            ease: [0.4, 0, 0.2, 1],
            duration: 0.5,
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    },
};

const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }
};

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
                <div className="container">
                    <a href="#accueil" className="main-nav__logo-link" data-cursor="pointer">
                        <div className="main-nav__logo">AB</div>
                    </a>

                    {/* Desktop Menu */}
                    <ul className="main-nav__list--desktop">
                        {navLinks.map(link => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <li key={link.href} style={{ position: 'relative' }}>
                                    <a
                                        href={link.href}
                                        className={`main-nav__link ${isActive ? 'is-active' : ''}`}
                                        onClick={handleNavLinkClick}
                                        data-cursor="pointer"
                                    >
                                        {link.label}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-highlight"
                                                className="nav-highlight"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="main-nav__actions">
                        <ThemeToggleButton toggleTheme={toggleTheme} theme={theme} />
                        <button 
                            className={`main-nav__toggle ${isMenuOpen ? 'is-active' : ''}`} 
                            onClick={toggleMenu} 
                            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                            data-cursor="pointer"
                        >
                            <span className="burger-bar"></span>
                            <span className="burger-bar"></span>
                            <span className="burger-bar"></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="mobile-menu-overlay"
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={toggleMenu}
                        />
                        <motion.div
                            className="main-nav__mobile-container"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <ul className="main-nav__list--mobile">
                                {navLinks.map(link => (
                                    <motion.li 
                                        key={link.href} 
                                        variants={linkVariants}
                                        style={{ width: '100%', textAlign: 'center' }}
                                    >
                                        <a
                                            href={link.href}
                                            className={`main-nav__link--mobile ${activeSection === link.href.substring(1) ? 'is-active' : ''}`}
                                            onClick={handleNavLinkClick}
                                            data-cursor="pointer"
                                        >
                                            {link.label}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                            
                            <motion.div className="mobile-menu-footer" variants={linkVariants}>
                                <p>© 2024 Portfolio</p>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navigation;
