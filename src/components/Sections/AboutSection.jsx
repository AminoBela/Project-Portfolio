import React from 'react';
import photo from '../../assets/photo-profil.jpg';
import cvPdf from '../../assets/cv.pdf';
import '../../styles/components.css';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

const highlights = [
    { icon: 'fa-code-branch', label: 'Projets', value: '15+' },
    { icon: 'fa-server', label: 'Ops', value: 'DevOps' },
    { icon: 'fa-user-graduate', label: 'BUT', value: 'DACS' },
];

const languages = ['Français', 'Anglais', 'Espagnol', 'Valencien', 'Arabe'];

export default function AboutSection() {
    return (
        <motion.section 
            id="about" 
            className="about-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="about-container-redesigned">
                {/* Colonne Gauche : Visuel & Intro */}
                <div className="about-visual-column">
                    <motion.div className="about-photo-wrapper" variants={childVariants}>
                        <div className="photo-blob"></div>
                        <img src={photo} alt="Amin Belalia" className="about-photo-redesigned" />
                        <div className="photo-badge">
                            <span className="status-dot"></span> Disponible
                        </div>
                    </motion.div>
                    
                    <motion.div className="about-intro-text" variants={childVariants}>
                        <h2 className="about-title-redesigned">
                            <span className="highlight-text">Amin</span> <br /> Belalia
                        </h2>
                        <p className="about-tagline">
                            Architecte de solutions numériques & passionné d'infrastructure.
                        </p>
                        <div className="about-actions">
                            <a href={cvPdf} className="btn-download" target="_blank" rel="noopener noreferrer">
                                <i className="fa-solid fa-download"></i> CV
                            </a>
                            <a href="https://www.linkedin.com/in/amin-belalia-bendjafar-8b340a227/" className="btn-social" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                            <a href="mailto:abelaliabendjafar@gmail.com" className="btn-social">
                                <i className="fa-solid fa-envelope"></i>
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Colonne Droite : Contenu Détaillé */}
                <div className="about-content-column">
                    <motion.div className="about-bio-card" variants={childVariants}>
                        <h3><i className="fa-solid fa-terminal"></i> Bio</h3>
                        <p>
                            Étudiant en BUT Informatique (parcours DACS), je ne me contente pas de coder : je conçois des écosystèmes. 
                            Mon objectif est de fusionner le développement applicatif avec la rigueur de l'administration système 
                            pour créer des solutions robustes, sécurisées et évolutives.
                        </p>
                    </motion.div>

                    <motion.div className="about-stats-row" variants={childVariants}>
                        {highlights.map((metric) => (
                            <div key={metric.label} className="stat-card">
                                <i className={`fa-solid ${metric.icon}`}></i>
                                <span className="stat-value">{metric.value}</span>
                                <span className="stat-label">{metric.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    <div className="about-details-grid">
                        <motion.div className="detail-card" variants={childVariants}>
                            <h4><i className="fa-solid fa-layer-group"></i> Stack Technique</h4>
                            <ul>
                                <li>JS/React, Node.js</li>
                                <li>Docker, Linux, Bash</li>
                                <li>CI/CD, Git</li>
                            </ul>
                        </motion.div>
                        
                        <motion.div className="detail-card" variants={childVariants}>
                            <h4><i className="fa-solid fa-earth-europe"></i> Langues</h4>
                            <div className="lang-tags">
                                {languages.map(l => <span key={l}>{l}</span>)}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
