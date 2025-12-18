import { useState, useEffect } from 'react';

export function useScrollspy() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px', // Ajusté pour mieux détecter le haut de la section
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Fonction pour attacher l'observateur aux sections
    const observeSections = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => observer.observe(section));
    };

    // 1. Observer immédiatement
    observeSections();

    // 2. Observer à nouveau quand le DOM change (pour le Lazy Loading)
    const mutationObserver = new MutationObserver(() => {
      observeSections();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Nettoyage
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return { activeSection, isMenuOpen, toggleMenu, setIsMenuOpen };
}
