import React from 'react';

function Button({ children, primary, secondary, href, download, onClick }) {
  const buttonClass = `button ${primary ? 'button--primary' : ''} ${secondary ? 'button--secondary' : ''}`;

  if (href) {
    return (
      <a href={href} download={download} className={buttonClass} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
