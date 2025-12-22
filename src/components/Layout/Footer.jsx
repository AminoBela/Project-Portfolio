import React from 'react';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="container footer__inner">
                <span className="footer__copy">
                    &copy; {new Date().getFullYear()} Amin Belalia. {t('footer_rights')}
                    {/* Indice Konami Code discret */}
                    <span 
                        title="↑ ↑ ↓ ↓ ← → ← → B A" 
                        style={{ marginLeft: '10px', cursor: 'help', opacity: 0.3 }}
                    >
                        _
                    </span>
                </span>
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
