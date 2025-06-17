import React from 'react';
// import { motion } from 'framer-motion'; // Pas besoin si motion n'est plus utilisé ici
import ThemeToggleButton from './ThemeToggleButton';
// Retire l'import de menuVariants

function Navigation({ activeSection, isMenuOpen, toggleMenu, toggleTheme, theme, onNavLinkClick }) {
  return (
    <div className="container">
      <h1 className="main-nav__logo">Amin Belalia</h1>
      <button className="main-nav__toggle" onClick={toggleMenu}>
        <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </button>
      {/* C'est ici que nous avons retiré motion.ul pour laisser le CSS gérer l'affichage */}
      <ul className={`main-nav__list ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <a
            href="#accueil"
            className={`main-nav__link ${activeSection === 'accueil' ? 'is-active' : ''}`}
            onClick={onNavLinkClick}
          >
            &gt; accueil
          </a>
        </li>
        <li>
          <a
            href="#a-propos"
            className={`main-nav__link ${activeSection === 'a-propos' ? 'is-active' : ''}`}
            onClick={onNavLinkClick}
          >
            &gt; a-propos
          </a>
        </li>
        <li>
          <a
            href="#competences"
            className={`main-nav__link ${activeSection === 'competences' ? 'is-active' : ''}`}
            onClick={onNavLinkClick}
          >
            &gt; competences
          </a>
        </li>
        <li>
          <a
            href="#stage"
            className={`main-nav__link ${activeSection === 'stage' ? 'is-active' : ''}`}
            onClick={onNavLinkClick}
          >
            &gt; stage
          </a>
        </li>
        <li>
          <a
            href="#projets"
            className={`main-nav__link ${activeSection === 'projets' ? 'is-active' : ''}`}
            onClick={onNavLinkClick}
          >
            &gt; projets
          </a>
        </li>
        <li>
          <a href="https://github.com/AminoBela" target="_blank" rel="noopener noreferrer" className="main-nav__icon-link">
            <i className="fab fa-github"></i>
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/amin-belalia-bendjafar-8b340a227" // Double vérifié le LinkedIn
            target="_blank"
            rel="noopener noreferrer"
            className="main-nav__icon-link"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </li>
        <li>
          <ThemeToggleButton toggleTheme={toggleTheme} theme={theme} />
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
