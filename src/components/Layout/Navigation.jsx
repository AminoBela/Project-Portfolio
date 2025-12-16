import React from 'react';
import { motion } from 'framer-motion';
import ThemeToggleButton from './ThemeToggleButton';

const navLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#about', label: 'À propos' },
    { href: '#parcours', label: 'Parcours' },
    { href: '#competences', label: 'Compétences' },
    { href: '#projets', label: 'Projets' },
];

function Navigation({ activeSection, isMenuOpen, toggleMenu, toggleTheme, theme, isScrolled, onNavLinkClick }) {
    return (
        <div className="container">
            <a href="#accueil" className="main-nav__logo-link" data-cursor="pointer">
                <div className="main-nav__logo">
                    AB
                </div>
            </a>

            <ul className={`main-nav__list ${isMenuOpen ? 'active' : ''}`}>
                {navLinks.map(link => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className={`main-nav__link ${activeSection === link.href.substring(1) ? 'is-active' : ''}`}
                            onClick={onNavLinkClick}
                            data-cursor="pointer"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="main-nav__actions">
                <ThemeToggleButton toggleTheme={toggleTheme} theme={theme} />
                <button className="main-nav__toggle" onClick={toggleMenu} aria-label="Ouvrir le menu">
                    <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
        </div>
    );
}

export default Navigation;
