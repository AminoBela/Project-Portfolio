import React from 'react';
function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <span>&copy; {new Date().getFullYear()} Amin Belalia. Tous droits réservés.</span>
                <span style={{ float: 'right' }}>
          <a href="mailto:amin.belalia@example.com">Contact</a>
        </span>
            </div>
        </footer>
    );
}
export default Footer;