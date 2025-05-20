import React from 'react';

function ThemeToggleButton({ toggleTheme, theme }) {
  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {theme === 'terminal' ? 'Clair' : 'Terminal'}
    </button>
  );
}

export default ThemeToggleButton;
