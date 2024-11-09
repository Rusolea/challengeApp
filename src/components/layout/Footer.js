// src/components/layout/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p className="mb-0">© {new Date().getFullYear()} Mi Gimnasio. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
