import { useState, useEffect, useRef } from 'react';

export function useScrollspy() {
  const [activeSection, setActiveSection] = useState('accueil');
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

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observerRef.current.observe(section));

    const mainEl = document.querySelector('main');
    let mutationObserver = null;

    if (mainEl) {
      mutationObserver = new MutationObserver(() => {
        const newSections = document.querySelectorAll('section');
        newSections.forEach((section) => {
          observerRef.current.observe(section);
        });
      });

      mutationObserver.observe(mainEl, {
        childList: true,
        subtree: false
      });
    }

    return () => {
      observerRef.current?.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  return { activeSection };
}
