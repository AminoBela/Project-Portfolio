import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './index.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [theme, setTheme] = useState('terminal');
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const [showInteractionText, setShowInteractionText] = useState(false);

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

  // Afficher le texte interactif après 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInteractionText(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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

  const toggleTerminal = () => {
    setIsTerminalOpen(!isTerminalOpen);
    if (!isTerminalOpen) setIsTerminalMaximized(false);
  };

  const maximizeTerminal = () => {
    setIsTerminalMaximized(!isTerminalMaximized);
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

  const terminalWindowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const interactionTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

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

  const aboutLines = [
    "user@amin-belalia:~$ whoami",
    "Amin Belalia",
    "user@amin-belalia:~$ cat about.txt",
    "Étudiant en 2ème année de BUT Informatique à l'IUT Nancy-Charlemagne.",
    "Spécialisé dans le déploiement, administration système et réseaux ainsi que le Cloud.",
    "Passionné par le développement, la cybersécurité et les tech modernes.",
    "user@amin-belalia:~$ hobbies",
    "- Cybersécurité",
    "- Sport mécanique et mécanique auto.",
    "user@amin-belalia:~$ cat education.txt",
    "2023-2026 : BUT Informatique, IUT Nancy-Charlemagne",
    "2022-2023 : Prépa integrée Peip, Polytech Nancy",
    "2019-2022 : Baccalauréat general, Lycée Alfred Mézières (Longwy)",
    "user@amin-belalia:~$ exit",
  ];

  const typedText = "C'est moi, Amin Belalia";
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

  const lineVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
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
        className="terminal-section about-section"
      >
        <div className="container">
          <motion.h2 variants={childVariants} className="terminal-command about-title">
            > À propos de moi
          </motion.h2>
          <motion.p variants={childVariants} className="terminal-text about-subtitle">
            Dossier personnel : Amin Belalia
          </motion.p>
          <motion.div variants={childVariants} className="desktop-background">
            <motion.div
              className="desktop-icon"
              onClick={toggleTerminal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-terminal desktop-icon-symbol"></i>
              <span className="desktop-icon-label">Terminal</span>
            </motion.div>
            {isTerminalOpen && (
              <motion.div
                variants={terminalWindowVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={`terminal-window ${isTerminalMaximized ? 'maximized' : ''}`}
              >
                <div className="terminal-header">
                  <span className="terminal-button red" onClick={toggleTerminal}></span>
                  <span className="terminal-button yellow"></span>
                  <span className="terminal-button green" onClick={maximizeTerminal}></span>
                  <span className="terminal-title">bash -- Amin Belalia</span>
                </div>
                <div className="terminal-body">
                  {aboutLines.map((line, index) => (
                    <motion.p
                      key={index}
                      variants={lineVariants}
                      initial="hidden"
                      animate="visible"
                      className={line.startsWith('user@') ? 'terminal-command' : 'terminal-text'}
                    >
                      {line}
                    </motion.p>
                  ))}
                  <span className="terminal-cursor">|</span>
                </div>
              </motion.div>
            )}
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
            > Mes projets
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
    </div>
  );
}

export default App;
