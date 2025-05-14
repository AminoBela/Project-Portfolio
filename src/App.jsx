import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './index.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Récupérer les projets GitHub
  useEffect(() => {
    axios
      .get('https://api.github.com/users/AminoBela/repos')
      .then((response) => setProjects(response.data))
      .catch((error) => console.error('Erreur API GitHub:', error));
  }, []);

  // Gérer le mode sombre/clair
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Scrollspy pour section active
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            setIsMenuOpen(false); // Ferme le menu sur mobile après clic
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
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

  return (
    <div>
      {/* Navigation */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
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
                Accueil
              </a>
            </li>
            <li>
              <a href="#a-propos" className={`nav-link ${activeSection === 'a-propos' ? 'active' : ''}`}>
                À propos
              </a>
            </li>
            <li>
              <a href="#projets" className={`nav-link ${activeSection === 'projets' ? 'active' : ''}`}>
                Projets
              </a>
            </li>
            <li>
              <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>
                Contact
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
                {theme === 'light' ? 'Sombre' : 'Clair'}
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
        style={{ background: 'linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))' }}
      >
        <div className="container">
          <motion.h1 variants={childVariants}>
            Bonjour, je suis Amin Belalia
          </motion.h1>
          <motion.p variants={childVariants}>
            Étudiant en BUT Informatique - Déploiement d'Applications Communicantes et Sécurisées
          </motion.p>
          <motion.a
            variants={childVariants}
            href="#projets"
            className="button"
          >
            Découvrir mes projets
          </motion.a>
        </div>
      </motion.section>

      {/* Section À propos */}
      <motion.section
        id="a-propos"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container">
          <motion.h2 variants={childVariants}>
            À propos
          </motion.h2>
          <motion.p variants={childVariants}>
            Je suis étudiant en 2ème année de BUT Informatique à l'IUT de [ta ville], spécialisé dans le déploiement d'applications communicantes et sécurisées. Passionné par le développement web, la cybersécurité et les technologies modernes, j'ai réalisé plusieurs projets disponibles sur mon GitHub.
          </motion.p>
          <motion.p variants={childVariants}>
            <strong>Compétences :</strong> HTML, CSS, JavaScript, React, Node.js, Git, Sécurité informatique
          </motion.p>
          <motion.a
            variants={childVariants}
            href="/cv.pdf"
            download
            className="button"
          >
            Télécharger mon CV
          </motion.a>
        </div>
      </motion.section>

      {/* Section Projets */}
      <motion.section
        id="projets"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="container">
          <motion.h2 variants={childVariants}>
            Mes Projets
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
                className="project-card"
              >
                <h3>{project.name}</h3>
                <p>{project.description || 'Pas de description'}</p>
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  Voir sur GitHub
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
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container">
          <motion.h2 variants={childVariants}>
            Contact
          </motion.h2>
          <motion.p variants={childVariants}>
            Envie de collaborer ou de discuter d'un projet ? Contactez-moi !
          </motion.p>
          <motion.div variants={childVariants} className="contact-links">
            <a href="mailto:abelaliabendjafar@gmail.com" title="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://github.com/AminoBela" target="_blank" rel="noopener noreferrer" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://linkedin.com/in/amin-belalia-bendjafar-8b340a227" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          </motion.div>
          <motion.form
            variants={childVariants}
            action="https://formspree.io/f/TON_ID_FORMSPREE"
            method="POST"
          >
            <input type="text" name="name" placeholder="Nom" required />
            <input type="email" name="email" placeholder="Email" required />
            <textarea name="message" placeholder="Message" rows="4" required />
            <button type="submit">Envoyer</button>
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
}

export default App;
