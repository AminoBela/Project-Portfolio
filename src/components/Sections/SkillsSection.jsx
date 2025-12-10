import React from 'react';
import VutSkillsGrid from '../Skills/VutSkillsGrid';
import TechnologiesSection from '../Skills/TechnologiesSection';
import '../../styles/components.css';

function SkillsSection() {
    return (
        <section id="competences" className="skills-section terminal-section">
            <div className="container">
                <VutSkillsGrid />
                <div className="technologies-wrapper">
                    <TechnologiesSection />
                </div>
            </div>
        </section>
    );
}

export default SkillsSection;
