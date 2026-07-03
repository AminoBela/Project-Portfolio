

function Button({ children, primary, secondary, href, download, target, rel, className = '', onClick, ...rest }) {

  const buttonClass = `button ${primary ? 'button--primary' : ''} ${secondary ? 'button--secondary' : ''} ${className}`.trim();

  if (href) {
    return (
      <a href={href} download={download} className={buttonClass} onClick={onClick} target={target} rel={rel} {...rest}>
        <span className="button__inner">{children}</span>
      </a>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} {...rest}>
      <span className="button__inner">{children}</span>
    </button>
  );
}

export default Button;
