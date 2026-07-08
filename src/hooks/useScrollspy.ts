import { useState, useEffect } from 'react';

/** Suit la section visible à l'écran pour piloter l'état actif de la navigation. */
export function useScrollspy() {
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    document.querySelectorAll('section').forEach((section) => observer.observe(section));

    // Les sections lazy-loadées apparaissent après coup : on les observe à leur montage
    const mainEl = document.querySelector('main');
    let mutationObserver: MutationObserver | null = null;
    if (mainEl) {
      mutationObserver = new MutationObserver(() => {
        document.querySelectorAll('section').forEach((section) => observer.observe(section));
      });
      mutationObserver.observe(mainEl, { childList: true, subtree: false });
    }

    return () => {
      observer.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  return { activeSection };
}
