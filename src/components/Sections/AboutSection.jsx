import React, { useState } from 'react';
import photo from '../../assets/photo-profil.jpg';
import cvPdf from '../../assets/cv.pdf';
import '../../styles/components.css';
import { motion } from 'framer-motion';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';
import Modal from '../UI/Modal'; // Import de la modale

const highlights = [
    { icon: 'fa-network-wired', label: 'Réseau', value: 'TCP/IP' },
    { icon: 'fa-linux', label: 'Système', value: 'Linux/Unix' },
    { icon: 'fa-database', label: 'Données', value: 'SQL' },
];

const languages = ['Français', 'Anglais', 'Espagnol', 'Valencien', 'Arabe'];

export default function AboutSection() {
    const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);

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
                            Étudiant en BUT Informatique, parcours DACS.
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
                        <h3><i className="fa-solid fa-user-astronaut"></i> Bio</h3>
                        <p>
                            Actuellement en 3ème année de BUT Informatique, parcours DACS (Déploiement d'Applications Communicantes et Sécurisées), 
                            je me spécialise dans l'administration système et réseau, la virtualisation et la sécurisation des infrastructures. 
                            Mon objectif est de garantir la disponibilité, la performance et la sécurité des applications.
                        </p>
                    </motion.div>

                    {/* --- CARTE RECHERCHE DE STAGE (CLIQUABLE) --- */}
                    <motion.div 
                        className="internship-card" 
                        variants={childVariants}
                        onClick={() => setIsInternshipModalOpen(true)}
                        style={{ cursor: 'pointer' }} // Fallback CSS
                        data-cursor="pointer" // Active le curseur personnalisé
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="internship-icon">
                            <i className="fa-solid fa-briefcase"></i>
                        </div>
                        <div className="internship-content">
                            <h4>Recherche de Stage</h4>
                            <p>
                                Stage de fin d'études en <strong>Admin Sys / Réseau / Virtualisation</strong>.
                            </p>
                            <div className="internship-details">
                                <span><i className="fa-regular fa-calendar"></i> 13 Avril 2026</span>
                                <span className="click-hint">En savoir plus &rarr;</span>
                            </div>
                        </div>
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
                            <h4><i className="fa-solid fa-layer-group"></i> Compétences Clés</h4>
                            <ul>
                                <li>Admin. Linux, Scripting (Bash, Perl, Ruby)</li>
                                <li>Virtualisation (Conteneurs, Hyperviseurs)</li>
                                <li>Admin. Réseau (Routage, iptables, VPN)</li>
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

            {/* --- MODALE STAGE --- */}
            <Modal isOpen={isInternshipModalOpen} onClose={() => setIsInternshipModalOpen(false)}>
                <div className="modal-hero" style={{ background: 'linear-gradient(135deg, rgba(102, 255, 153, 0.15) 0%, rgba(0,0,0,0) 100%)', borderBottom: '1px solid rgba(102, 255, 153, 0.3)' }}>
                    <div className="modal-hero__content">
                        <span className="modal-hero__badge" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
                            Stage de Fin d'Études
                        </span>
                        <h2>Recherche de Stage</h2>
                        <p className="expanded-card-subtitle">Administration Système & Réseau • Virtualisation • Déploiement</p>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="stats-grid">
                        <div className="stat-box">
                            <span className="stat-label">Début</span>
                            <span className="stat-value">13 Avril 2026</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Durée</span>
                            <span className="stat-value">14 Semaines</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label">Lieu</span>
                            <span className="stat-value">Luxembourg / Lorraine</span>
                        </div>
                    </div>

                    <div className="tech-section">
                        <div className="tech-stack">
                            <h4><i className="fa-solid fa-location-dot"></i> Mobilité</h4>
                            <p className="project-full-desc">
                                Je recherche activement au <strong>Luxembourg</strong>, ainsi que dans les secteurs de <strong>Longwy, Metz et Nancy</strong>.
                                <br />
                                Permis B et véhicule personnel.
                            </p>
                        </div>

                        <div className="tech-stack" style={{ marginTop: '2rem' }}>
                            <h4><i className="fa-solid fa-bullseye"></i> Missions Recherchées</h4>
                            <ul className="highlights-list">
                                <li><span>✓</span> Administration et maintenance de serveurs Linux/Windows</li>
                                <li><span>✓</span> Gestion d'infrastructures virtualisées (VMware, Proxmox)</li>
                                <li><span>✓</span> Déploiement de conteneurs (Docker, Kubernetes)</li>
                                <li><span>✓</span> Configuration d'équipements réseaux et sécurité</li>
                            </ul>
                        </div>

                        <div className="tech-stack" style={{ marginTop: '2rem' }}>
                            <h4><i className="fa-solid fa-address-card"></i> Me Contacter</h4>
                            <div className="contact-buttons" style={{ justifyContent: 'flex-start' }}>
                                <a href="mailto:abelaliabendjafar@gmail.com" className="btn-download">
                                    <i className="fa-solid fa-envelope"></i> abelaliabendjafar@gmail.com
                                </a>
                                <a href="tel:+33752078999" className="btn-social" style={{ width: 'auto', padding: '0 1.5rem', borderRadius: '12px' }}>
                                    <i className="fa-solid fa-phone"></i> 07 52 07 89 99
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </motion.section>
    );
}
