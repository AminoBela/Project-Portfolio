import { useState, useEffect } from 'react';

export function useScrollspy() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // setIsMenuOpen(false); // Tu peux commenter ou gérer ça dans Navigation.jsx si tu veux que le menu ne se ferme pas automatiquement sur mobile
          }
        });
      },
      { threshold: 0.5 } // Peut ajuster si nécessaire
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return { activeSection, isMenuOpen, toggleMenu, setIsMenuOpen };
}
