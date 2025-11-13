import React from 'react';
function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <span className="footer__copy">&copy; {new Date().getFullYear()} Amin Belalia</span>
                <nav className="footer__links">
                    <a href="mailto:amin.belalia@example.com" className="footer__link">Contact</a>
                    <a href="https://github.com/AminoBela" target="_blank" rel="noopener" className="footer__link">GitHub</a>
                    <a href="https://linkedin.com/in/amin-belalia-bendjafar-8b340a227" target="_blank" rel="noopener" className="footer__link">LinkedIn</a>
                </nav>
            </div>
        </footer>
    );
}
export default Footer;