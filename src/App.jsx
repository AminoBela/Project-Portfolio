import { motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useScrollspy } from './hooks/useScrollspy';
import Navigation from './components/Layout/Navigation';
import HomeSection from './components/Sections/HomeSection';
import AboutSection from './components/Sections/AboutSection';
import SkillsSection from './components/Sections/SkillsSection';
import ProjectsSection from './components/Sections/ProjectsSection';
import { navVariants } from './utils/framerMotionVariants'; // Utilise les variants centralisés

function App() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection, isMenuOpen, toggleMenu, setIsMenuOpen } = useScrollspy();

  return (
    <div>
      {/* Navigation - Applique navVariants au conteneur principal de la nav */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="main-nav"
      >
        <Navigation
          activeSection={activeSection}
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          toggleTheme={toggleTheme}
          theme={theme}
          onNavLinkClick={() => setIsMenuOpen(false)} // Ferme le menu au clic sur un lien
        />
      </motion.nav>

      {/* Sections */}
      <HomeSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      
      {/* Tu peux ajouter un footer ici si besoin */}
    </div>
  );
}

export default App;
