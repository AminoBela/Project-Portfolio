import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';

function Navigation({ activeSection, isMenuOpen, toggleMenu, toggleTheme, theme, isScrolled, onNavLinkClick }) {
  return (
    <div className="container">
      <a href="#accueil" className="main-nav__logo-link">
        <h1 className="main-nav__logo">
          <span className="logo-full">Amin Belalia</span>
          <span className="logo-compact">AB</span>
        </h1>
      </a>
      <button className="main-nav__toggle" onClick={toggleMenu}>
        <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
      </button>
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
            href="#about"
            className={`main-nav__link ${activeSection === 'about' ? 'is-active' : ''}`}
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
            href="https://linkedin.com/in/amin-belalia-bendjafar-8b340a227"
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
