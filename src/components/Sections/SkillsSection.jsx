import React from 'react';
import { vutSkills } from '../../data/vutSkills';
import { skills } from '../../data/skillsData';
import SkillBar from '../UI/SkillBar';
import Button from '../UI/Button';

// Catégorisation des technologies
const skillCategories = [
  {
    name: "Frontend",
    items: skills.filter(s => ["HTML", "CSS", "React", "JavaScript"].includes(s.name)),
  },
  {
    name: "Backend",
    items: skills.filter(s => ["PHP", "Java", "C", "SQL"].includes(s.name)),
  },
  {
    name: "Systèmes & Outils",
    items: skills.filter(s => ["Linux (Bash)", "Git", "VBA"].includes(s.name)),
  },
  {
    name: "Déploiement",
    items: skills.filter(s => ["Docker", "Kubernetes"].includes(s.name)),
  },
];

function renderStars(count) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < count ? '#FFD700' : '#ccc', fontSize: '1.1rem' }}>★</span>
  ));
}

function SkillsSection() {
  return (
    <section id="competences" className="terminal-section skills-section">
      <div className="container">
        <h2 className="terminal-command">&gt; Compétences</h2>
        <div className="skills-table-wrapper">
          <div className="skills-table-responsive">
            <table className="vut-skills-table">
              <thead>
                <tr>
                  <th>Compétence</th>
                  <th>Autoévaluation</th>
                  <th>Commentaire</th>
                  <th>Projet GitHub</th>
                </tr>
              </thead>
              <tbody>
                {vutSkills.map((skill, idx) => (
                  <tr key={idx}>
                    <td><span>{skill.name}</span></td>
                    <td>{renderStars(skill.level)}</td>
                    <td>{skill.comment}</td>
                    <td>
                      {skill.github ? (
                        <Button href={skill.github} target="_blank" rel="noopener noreferrer" secondary>
                          Voir
                        </Button>
                      ) : (
                        <span style={{ color: '#888', fontSize: '0.95em' }}>N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="terminal-command" style={{ marginTop: '2.5rem' }}>&gt; Technologies</h2>
        <div className="skills-grid-wide">
          {skillCategories.map(category => (
            <div key={category.name} className="skills-category tech-card">
              <div className="skills-category-title">{category.name}</div>
              <div className="skills-category-list">
                {category.items.map(skill => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;