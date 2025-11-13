import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Tente de récupérer le thème depuis localStorage pour persistance
    const storedTheme = localStorage.getItem('portfolioTheme');
    return storedTheme || 'terminal';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'terminal');
    document.documentElement.classList.add(theme);
    localStorage.setItem('portfolioTheme', theme); // Sauvegarde le thème
  }, [theme]);

  const toggleTheme = () => {
    // Ajoute une classe de transition globale le temps du switch
    const root = document.documentElement;
    if (!root.classList.contains('theme-transition')) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 450);
    }
    setTheme((prevTheme) => (prevTheme === 'terminal' ? 'light' : 'terminal'));
  };

  return { theme, toggleTheme };
}
