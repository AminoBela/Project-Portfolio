import React from 'react';
import { motion } from 'framer-motion';

function SkillBar({ skill }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <img src={skill.icon} alt={`${skill.name} logo`} className="skill-icon" />
        <span className="terminal-text skill-name">{skill.name}</span>
        <span className="skill-level">{skill.level}%</span>
      </div>
      <div className="progress-bar">
        <motion.div
          className="progress"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default SkillBar;
