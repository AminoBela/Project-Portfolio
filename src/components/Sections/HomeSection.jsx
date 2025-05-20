import React from 'react';
import { motion } from 'framer-motion';
import { TypedText } from '../UI/TypedText';
import Button from '../UI/Button';
import { typedText } from '../../data/constants';
import { sectionVariants, childVariants } from '../../utils/framerMotionVariants';
import cvPdf from '../../assets/cv.pdf'; // Assure-toi que le chemin est correct

function HomeSection() {
  return (
    <motion.section
      id="accueil"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="terminal-section hero-section" // Ajout de hero-section pour la sémantique
    >
      <div className="container">
        <TypedText text={typedText} />
        <motion.p variants={childVariants} className="terminal-text hero-subtitle">
          Étudiant en BUT Informatique - Déploiement d'Applications Communicantes et Sécurisées
        </motion.p>
        <motion.div variants={childVariants} className="button-group">
          <Button href="#projets" primary>
            &gt; Découvrir mes projets
          </Button>
          <Button href={cvPdf} download secondary>
            &gt; Télécharger mon CV
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default HomeSection;
