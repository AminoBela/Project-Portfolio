import React from 'react';

function Button({ children, primary, secondary, href, download, target, rel, className = '', onClick, ...rest }) {
  const buttonClass = `button ${primary ? 'button--primary' : ''} ${secondary ? 'button--secondary' : ''} ${className}`.trim();

  if (href) {
    return (
      <a href={href} download={download} className={buttonClass} onClick={onClick} target={target} rel={rel} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}

export default Button;
