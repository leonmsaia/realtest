import React from 'react';

// Styles
import './Footer.css';

const Footer = () => {
  return (
    <>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-4 mb-0 text-muted">© 2024 REALTEST, Prueba Tecnica</p>
            <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                RealTest
            </a>
            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a href="https://www.linkedin.com/in/leonmsaia/" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">Linkedin</a></li>
                <li className="nav-item"><a href="mailto:leonmsaia@gmail.com" target="_blank" rel="noreferrer" className="nav-link px-2 text-muted">Mail</a></li>
            </ul>
        </footer>
    </>
  );
};

export default Footer;
