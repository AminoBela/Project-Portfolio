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
    setTheme((prevTheme) => (prevTheme === 'terminal' ? 'light' : 'terminal'));
  };

  return { theme, toggleTheme };
}
