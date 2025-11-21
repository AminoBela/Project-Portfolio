import React from 'react';
import photo from '../../assets/photo-profil.jpg';
import cvPdf from '../../assets/cv.pdf';
import './AboutSection.css';

export default function AboutSection() {
    const languages = ['Français', 'Anglais', 'Espagnol', 'Valencien', 'Arabe'];
    const highlights = [
        { icon: 'fa-code-branch', label: 'Projets menés', value: '15+' },
        { icon: 'fa-server', label: 'Missions Ops', value: 'Dev & Ops' },
        { icon: 'fa-user-graduate', label: 'BUT Info', value: 'Parcours DACS' },
    ];

    return (
        <section id="about" className="about-section terminal-section">
            <div className="about-container">
                <div className="about-photo-wrap">
                    <img src={photo} alt="Amin Belalia" className="about-photo" />
                </div>
                <div className="about-content">
                    <div className="about-terminal">
                        <div className="about-header">
                            <span className="about-dot red"></span>
                            <span className="about-dot yellow"></span>
                            <span className="about-dot green"></span>
                            <span className="about-title">amin@portfolio:~/about</span>
                        </div>
                        <div className="about-body">
                            <span className="about-prompt">&gt;_</span>
                            <span className="about-hi">Salut, moi c'est Amin&nbsp;!</span>
                            <div className="about-summary">
                                <p className="about-desc">
                                    Étudiant en BUT Informatique (parcours DACS), je conçois des applications modernes
                                    et je fais vivre l’infrastructure qui les porte. J’adore assembler design, dev, automatisation
                                    et sécurité pour livrer des solutions fiables.
                                </p>
                                <div className="about-metrics">
                                    {highlights.map((metric) => (
                                        <div key={metric.label} className="about-metric">
                                            <i className={`fa-solid ${metric.icon}`} aria-hidden="true"></i>
                                            <span className="about-metric__value">{metric.value}</span>
                                            <span className="about-metric__label">{metric.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="about-panels">
                                <article className="about-card">
                                    <header className="about-card__header">
                                        <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                                        <span>Profil</span>
                                    </header>
                                    <p>Spécialisation en déploiement d’applications communicantes & sécurisées.</p>
                                    <ul>
                                        <li>Stack cœur : JS/React, Node, Docker, Linux</li>
                                        <li>Soft skills : rigueur, curiosité, communication</li>
                                        <li>Objectif : solutions fiables, accessibles, maintenables</li>
                                    </ul>
                                </article>
                                <article className="about-card">
                                    <header className="about-card__header">
                                        <i className="fa-solid fa-sitemap" aria-hidden="true"></i>
                                        <span>Compétences clés</span>
                                    </header>
                                    <ul>
                                        <li>Conception & dev (POO, patterns, tests)</li>
                                        <li>Admin systèmes & réseaux, sécurité</li>
                                        <li>Automation DevOps, CI/CD, supervision</li>
                                    </ul>
                                    <a href="#competences" className="about-card__cta" data-cursor="pointer">
                                        Voir le détail des compétences
                                    </a>
                                </article>
                                <article className="about-card">
                                    <header className="about-card__header">
                                        <i className="fa-solid fa-earth-europe" aria-hidden="true"></i>
                                        <span>Langues</span>
                                    </header>
                                    <p>Je navigue dans des environnements multilingues.</p>
                                    <div className="lang-badges">
                                        {languages.map((l) => (
                                            <span key={l} className="lang-badge">{l}</span>
                                        ))}
                                    </div>
                                </article>
                            </div>
                            <div className="about-links">
                                <a href="mailto:abelaliabendjafar@gmail.com" className="about-link">Contact 📧</a>
                                <a href="https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/" className="about-link" target="_blank" rel="noopener">LinkedIn</a>
                                <a href={cvPdf} className="about-link" target="_blank" rel="noopener">CV</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}