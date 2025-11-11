import React from 'react';
import photo from '../../assets/photo-profil.jpg';
import cvPdf from '../../assets/cv.pdf';
import './AboutSection.css';

export default function AboutSection() {
    return (
        <section id="about" className="about-section">
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