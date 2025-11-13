import React from 'react';
import photo from '../../assets/photo-profil.jpg';
import cvPdf from '../../assets/cv.pdf';
import './AboutSection.css';

export default function AboutSection() {
    const languages = ['Français', 'Anglais', 'Espagnol', 'Valencien', 'Arabe'];

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
                            <p className="about-desc">
                                Passionné par le web, les systèmes et la sécurité.<br/>
                                Étudiant en BUT Informatique, je conçois des applications modernes et robustes.<br/>
                                J’aime relever les défis techniques, travailler en équipe et apprendre en continu.<br/>
                                <span className="about-highlight">Objectif : créer des solutions fiables et accessibles.</span>
                            </p>
                            <h3 className="about-section-title terminal-command">&gt; Profil</h3>
                            <div className="about-grid">
                                <div className="about-item">
                                    <div className="about-item__label"><i className="fa-solid fa-graduation-cap"></i> Spécialité</div>
                                    <div className="about-item__value">Déploiement d'applications communicantes et sécurisées</div>
                                </div>
                                <div className="about-item">
                                    <div className="about-item__label"><i className="fa-solid fa-bolt"></i> Forces</div>
                                    <div className="about-item__value">Rigueur, curiosité, sens du détail</div>
                                </div>
                                <div className="about-item">
                                    <div className="about-item__label"><i className="fa-solid fa-toolbox"></i> Stack</div>
                                    <div className="about-item__value">JS/React, Linux, Docker, Git</div>
                                </div>
                                <div className="about-item">
                                    <div className="about-item__label"><i className="fa-solid fa-people-group"></i> Soft skills</div>
                                    <div className="about-item__value">Travail en équipe, communication, autonomie</div>
                                </div>
                            </div>
                            <ul className="about-list">
                                <li><span className="about-bullet" />Conception de frontends propres et performants</li>
                                <li><span className="about-bullet" />Automatisation outillée et CI de base</li>
                                <li><span className="about-bullet" />Veille techno régulière et apprentissage continu</li>
                            </ul>
                            <h3 className="about-section-title terminal-command">&gt; Langues</h3>
                            <div className="lang-badges">
                                {languages.map((l) => (
                                    <span key={l} className="lang-badge">{l}</span>
                                ))}
                            </div>
                            <h3 className="about-section-title terminal-command" style={{ marginTop: '1.2rem' }}>&gt; Compétences</h3>
                            <div className="comp-grid">
                                <div className="comp-card">
                                    <div className="comp-card__title"><i className="fa-solid fa-layer-group comp-card__icon"></i> Générales</div>
                                    <ul className="comp-list">
                                        <li>Réaliser des applications (POO, patterns, modélisation, tests)</li>
                                        <li>Optimiser (algo itératif/récursif, structures, complexité)</li>
                                        <li>Administrer (système, configuration, protocoles/réseau)</li>
                                        <li>Gérer des données (modélisation, SQL, transactions)</li>
                                        <li>Conduire un dev (recueil besoin, projet, agilité)</li>
                                        <li>Collaborer (FR/EN, travail d’équipe, partage de code)</li>
                                    </ul>
                                </div>
                                <div className="comp-card">
                                    <div className="comp-card__title"><i className="fa-solid fa-code comp-card__icon"></i> Techniques générales</div>
                                    <ul className="comp-list">
                                        <li>Programmation: Java, PHP, C, JS (fonctionnel/événementiel)</li>
                                        <li>Qualité: patrons de conception, normes, bonnes pratiques</li>
                                        <li>Conception: UML, processus unifié, refactoring</li>
                                        <li>Tests/doc: JUnit, PHPUnit, Git, Javadoc</li>
                                        <li>Gestion projet: PERT, coûts, Gantt</li>
                                        <li>Web: HTML/CSS, PHP (sessions, sécurité)</li>
                                        <li>Systèmes/Réseaux: Unix/Windows, TCP/IP, DNS, HTTP, sockets, RMI</li>
                                        <li>BD: Modèle relationnel, SQL/PL-SQL, JDBC/PDO, MySQL/Oracle</li>
                                    </ul>
                                </div>
                                <div className="comp-card">
                                    <div className="comp-card__title"><i className="fa-solid fa-network-wired comp-card__icon"></i> Spécifiques parcours DACS</div>
                                    <ul className="comp-list">
                                        <li>Architectures & protocoles Internet (TCP/IP, HTTP, DNS, DHCP, SMTP…)</li>
                                        <li>Linux: bash, packaging, droits, utilisateurs, stockage</li>
                                        <li>Admin réseau: routage, iptables, SSH, VPN, VLAN, proxy, DNS/DHCP</li>
                                        <li>Admin serveurs/services: Apache/Nginx, LDAP, MySQL/PostgreSQL, CI/CD</li>
                                        <li>Virtualisation/Cloud: conteneurs, hyperviseurs, IaaS/PaaS/SaaS</li>
                                        <li>Infra: supervision, config mgmt, déploiement auto, HA, PRA/PCA</li>
                                        <li>Logiciels libres: Git, outils de projet, droit/licences, communautés</li>
                                        <li>Sécurité: politiques, durcissement, sécurisation comm/serveurs</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="about-links">
                                <a href="mailto:amin.belalia@example.com" className="about-link">Contact 📧</a>
                                <a href="https://www.linkedin.com/in/amin-belalia" className="about-link" target="_blank" rel="noopener">LinkedIn</a>
                                <a href={cvPdf} className="about-link" target="_blank" rel="noopener">CV</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}