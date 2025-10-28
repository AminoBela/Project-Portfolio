import React from 'react';
import photo from '../../assets/photo-profil.jpg';

function AboutSection() {
    return (
        <section id="about" className="terminal-section about-section">
            <div className="container about-flex">
                <img src={photo} alt="Amin Belalia" className="about-photo"/>
                <div>
                    <h2 className="terminal-command">&gt; À propos</h2>
                    <p>
                        Passionné par le développement web et les systèmes, je suis étudiant en BUT Informatique.<br/>
                        J'aime relever des challenges techniques, travailler en équipe et apprendre continuellement.<br/>
                        Mon objectif : créer des applications performantes, sécurisées et accessibles à tous.
                    </p>
                    <div className="about-links">
                        <a href="mailto:amin.belalia@example.com" className="about-link">Me contacter</a>
                        <a href="https://www.linkedin.com/in/amin-belalia" className="about-link" target="_blank">LinkedIn</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AboutSection;