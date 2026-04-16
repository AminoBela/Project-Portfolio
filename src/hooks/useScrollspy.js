import { useState, useEffect, useCallback, useRef } from 'react';

export function useScrollspy() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    // Observer les sections existantes
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observerRef.current.observe(section));

    // MutationObserver limité : observe seulement les enfants directs de main
    // au lieu de tout le body avec subtree (beaucoup plus performant)
    const mainEl = document.querySelector('main');
    let mutationObserver = null;

    if (mainEl) {
      mutationObserver = new MutationObserver(() => {
        // Re-observer les nouvelles sections (lazy loaded)
        const newSections = document.querySelectorAll('section');
        newSections.forEach((section) => {
          observerRef.current.observe(section);
        });
      });

      mutationObserver.observe(mainEl, {
        childList: true,
        subtree: false // Seulement les enfants directs
      });
    }

    return () => {
      observerRef.current?.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return { activeSection, isMenuOpen, toggleMenu, setIsMenuOpen };
}
