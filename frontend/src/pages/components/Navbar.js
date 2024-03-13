// Main Components
import React from 'react';

// Context
import { useAuth } from '../../context/AuthContext';

// Styles
import './Navbar.css';

const Navbar = () => {
  const { handleLogout } = useAuth();
  const handleLogoutClick = () => {
    handleLogout();
  };
  return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              RealTest
            </a>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            </ul>
            <div className="text-end">
              <button onClick={handleLogoutClick} className="btn btn-outline-light me-2">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;


