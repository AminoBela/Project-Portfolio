import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './index.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [theme, setTheme] = useState('terminal');
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Récupérer les projets GitHub
  useEffect(() => {
    axios
      .get('https://api.github.com/users/AminoBela/repos')
      .then((response) => setProjects(response.data))
      .catch((error) => console.error('Erreur API GitHub:', error));
  }, []);

  // Gérer le mode terminal/clair
  useEffect(() => {
    document.documentElement.classList.remove('light', 'terminal');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Scrollspy pour section active
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            setIsMenuOpen(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'terminal' ? 'light' : 'terminal');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animations
  const navVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const menuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2,
        type: 'spring',
        bounce: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  // Données des compétences avec niveaux et logos
  const skills = [
    { name: 'HTML', level: 90, icon: 'https://cdn.simpleicons.org/html5/66ff99' },
    { name: 'CSS', level: 85, icon: 'https://cdn.simpleicons.org/css3/66ff99' },
    { name: 'React', level: 75, icon: 'https://cdn.simpleicons.org/react/66ff99' },
    { name: 'JavaScript', level: 80, icon: 'https://cdn.simpleicons.org/javascript/66ff99' },
    { name: 'Linux (Bash)', level: 70, icon: 'https://cdn.simpleicons.org/linux/66ff99' },
    { name: 'Java', level: 65, icon: 'https://cdn.simpleicons.org/java/66ff99' },
    { name: 'Git', level: 85, icon: 'https://cdn.simpleicons.org/git/66ff99' },
    { name: 'C', level: 60, icon: 'https://cdn.simpleicons.org/c/66ff99' },
    { name: 'PHP', level: 70, icon: 'https://cdn.simpleicons.org/php/66ff99' },
    { name: 'VBA', level: 55, icon: 'https://cdn.simpleicons.org/microsoft/66ff99' },
  ];

  // Données pour le terminal "À propos de moi"
  const aboutLines = [
    "user@amin-belalia:~$ whoami",
    "Amin Belalia",
    "user@amin-belalia:~$ cat about.txt",
    "Étudiant en 2ème année de BUT Informatique à l'IUT de [ta ville].",
    "Spécialisé dans le déploiement d'applications communicantes et sécurisées.",
    "Passionné par le développement web, la cybersécurité et les technologies modernes.",
    "Projets disponibles sur GitHub : https://github.com/AminoBela",
    "user@amin-belalia:~$ exit",
  ];

  // Animation de texte qui se tape
  const typedText = "Bonjour, je suis Amin Belalia";
  const typedVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Animation pour les lignes du terminal
  const terminalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="terminal-nav"
      >
        <div className="container">
          <h1>Amin Belalia</h1>
          <button className="nav-toggle" onClick={toggleMenu}>
            <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
          <motion.ul
            className={isMenuOpen ? 'active' : ''}
            variants={menuVariants}
            initial="closed"
            animate={isMenuOpen ? 'open' : 'closed'}
          >
            <li>
              <a href="#accueil" className={`nav-link ${activeSection === 'accueil' ? 'active' : ''}`}>
                > accueil
              </a>
            </li>
            <li>
              <a href="#a-propos" className={`nav-link ${activeSection === 'a-propos' ? 'active' : ''}`}>
                > a-propos
              </a>
            </li>
            <li>
              <a href="#competences" className={`nav-link ${activeSection === 'competences' ? 'active' : ''}`}>
                > competences
              </a>
            </li>
            <li>
              <a href="#projets" className={`nav-link ${activeSection === 'projets' ? 'active' : ''}`}>
                > projets
              </a>
            </li>
            <li>
              <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
                > contact
              </a>
            </li>
            <li>
              <a href="https://github.com/AminoBela" target="_blank" rel="noopener noreferrer" className="icon-link">
                <i className="fab fa-github"></i>
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/amin-belalia-bendjafar-8b340a227" target="_blank" rel="noopener noreferrer" className="icon-link">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li>
              <button onClick={toggleTheme}>
                {theme === 'terminal' ? 'Clair' : 'Terminal'}
              </button>
            </li>
          </motion.ul>
        </div>
      </motion.nav>

      {/* Section Accueil */}
      <motion.section
        id="accueil"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="terminal-section"
      >
        <div className="container">
          <motion.div variants={typedVariants} initial="hidden" animate="visible" className="typed-text">
            {typedText.split('').map((char, index) => (
              <motion.span key={index} variants={letterVariants} style={{ margin: '0 0.05rem' }}>
                {char}
              </motion.span>
            ))}
            <span className="cursor">|</span>
          </motion.div>
          <motion.p variants={childVariants} className="terminal-text">
            Étudiant en BUT Informatique - Déploiement d'Applications Communicantes et Sécurisées
          </motion.p>
          <motion.div variants={childVariants} className="button-group">
            <a href="#projets" className="button">
              > Découvrir mes projets
            </a>
            <a href="/cv.pdf" download className="button secondary">
              > Télécharger mon CV
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Section À propos de moi */}
      <motion.section
        id="a-propos"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="terminal-section"
      >
        <div className="container">
          <motion.h2 variants={childVariants} className="terminal-command about-title">
            > À propos de moi
          </motion.h2>
          <motion.div
            variants={terminalVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="terminal-window"
          >
            <div className="terminal-header">
              <span className="terminal-button red"></span>
              <span className="terminal-button yellow"></span>
              <span className="terminal-button green"></span>
              <span className="terminal-title">bash -- Amin Belalia</span>
            </div>
            <div className="terminal-body">
              {aboutLines.map((line, index) => (
                <motion.p
                  key={index}
                  variants={lineVariants}
                  className={line.startsWith('user@') ? 'terminal-command' : 'terminal-text'}
                >
                  {line}
                </motion.p>
              ))}
              <span className="terminal-cursor">|</span> {/* Curseur ajouté ici */}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Compétences */}
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
            > Compétences
          </motion.h2>
          <motion.div variants={childVariants} className="terminal-skills">
            <div className="skills-container">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <img src={skill.icon} alt={`${skill.name} logo`} className="skill-icon" />
                    <span className="terminal-text">{skill.name}</span>
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
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Projets */}
      <motion.section
        id="projets"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="terminal-section"
      >
        <div className="container">
          <motion.h2 variants={childVariants} className="terminal-command">
            > Mes Projets
          </motion.h2>
          <motion.div
            variants={sectionVariants}
            className="project-grid"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={childVariants}
                whileInView="visible"
                viewport={{ once: true }}
                className="project-card terminal-card"
              >
                <h3 className="terminal-text">{project.name}</h3>
                <p className="terminal-text">{project.description || 'Pas de description'}</p>
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  > Voir sur GitHub
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Section Contact */}
      <motion.section
        id="contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="terminal-section"
      >
        <div className="container">
          <motion.h2 variants={childVariants} className="terminal-command">
            > Contact
          </motion.h2>
          <motion.p variants={childVariants} className="terminal-text">
            Envie de collaborer ou de discuter d'un projet ? Contactez-moi !
          </motion.p>
          <motion.div variants={childVariants} className="contact-links">
            <a href="mailto:abelaliabendjafar@gmail.com" title="Email" className="terminal-icon">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://github.com/AminoBela" target="_blank" rel="noopener noreferrer" title="GitHub" className="terminal-icon">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/amin-belalia-bendjafar-8b340a227" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="terminal-icon">
              <i className="fab fa-linkedin"></i>
            </a>
          </motion.div>
          <motion.form
            variants={childVariants}
            action="https://formspree.io/f/TON_ID_FORMSPREE"
            method="POST"
            className="terminal-form"
          >
            <input type="text" name="name" placeholder="> Nom" required />
            <input type="email" name="email" placeholder="> Email" required />
            <textarea name="message" placeholder="> Message" rows="4" required />
            <button type="submit" className="button">
              > Envoyer
            </button>
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
}

export default App;
