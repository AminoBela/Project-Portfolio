import React from 'react';
import { motion } from 'framer-motion';
import SkillBar from '../UI/SkillBar';
import { skills } from '../../data/skillsData';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';

function SkillsSection() {
  return (
    <motion.section
      id="competences"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="terminal-section"
    >
      <div className="container">
        <motion.h2 variants={childVariants} className="terminal-command">
          &gt; Compétences
        </motion.h2>
        <motion.div variants={childVariants} className="terminal-skills">
          <div className="skills-container">
            {skills.map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default SkillsSection;
