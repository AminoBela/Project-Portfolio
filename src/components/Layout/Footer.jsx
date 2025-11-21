import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <span className="footer__copy">&copy; {new Date().getFullYear()} Amin Belalia. Tous droits réservés.</span>
                <div className="footer__socials">
                    <a href="mailto:abelaliabendjafar@gmail.com" className="footer__social-link" aria-label="Email">
                        <i className="fas fa-envelope"></i>
                    </a>
                    <a href="https://github.com/AminoBela" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="GitHub">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://linkedin.com/in/amin-belalia-bendjafar-8b340a227" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
