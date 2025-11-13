import React from 'react';
import Button from '../UI/Button';
import './HomeSection.css';
import cvPdf from '../../assets/cv.pdf';

const technologies = [
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
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
                            <Button href="#projets" primary className="big-btn" type="button">&gt; Voir mes projets</Button>
                            <Button href="#about" secondary className="big-btn" type="button">&gt; À propos de moi</Button>
                            <Button href={cvPdf} download className="big-btn" type="button">&gt; Télécharger mon CV</Button>
                        </div>
                        <div className="home-tech-title">Outils & technologies</div>
                        <div className="home-tech-list">
                            {technologies.map((tech) => (
                                <div className="tech-badge" key={tech.name}>
                                    <img src={tech.icon} alt={tech.name} className="tech-icon" loading="lazy" />
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