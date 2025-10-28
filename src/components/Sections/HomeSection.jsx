import React from 'react';
import { motion } from 'framer-motion';
import Button from '../UI/Button';
import './HomeSection.css';

const technologies = [
    { name: "HTML", icon: "/assets/tech-logos/html.svg" },
    { name: "CSS", icon: "/assets/tech-logos/css.svg" },
    { name: "JavaScript", icon: "/assets/tech-logos/js.svg" },
    { name: "React", icon: "/assets/tech-logos/react.svg" },
    { name: "Docker", icon: "/assets/tech-logos/docker.svg" },
    { name: "Linux", icon: "/assets/tech-logos/linux.svg" },
    { name: "Git", icon: "/assets/tech-logos/git.svg" }
];

export default function HomeSection() {
    return (
        <section id="accueil" className="home-section">
            <div className="pc-screen-big">
                <div className="screen-glow"></div>
                <div className="terminal-window">
                    <div className="terminal-header">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="terminal-title">amin@portfolio:~$</span>
                    </div>
                    <div className="terminal-body">
                        <span className="terminal-prompt">&gt;_</span>
                        <span className="typed-text">Bienvenue sur mon portfolio !</span>
                        <br />
                        <span className="terminal-desc">
              Étudiant en BUT Informatique – Déploiement d'Applications Communicantes et Sécurisées
            </span>
                        <div className="home-btn-group">
                            <Button href="#projets" primary className="big-btn">&gt; Voir mes projets</Button>
                            <Button href="#about" secondary className="big-btn">&gt; À propos de moi</Button>
                            <Button href="/assets/cv.pdf" download className="big-btn">&gt; Télécharger mon CV</Button>
                        </div>
                        <div className="home-tech-title">Outils & technologies</div>
                        <div className="home-tech-list">
                            {technologies.map(tech => (
                                <div className="tech-badge" key={tech.name}>
                                    <img src={tech.icon} alt={tech.name} className="tech-icon" />
                                    <span className="tech-name">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}