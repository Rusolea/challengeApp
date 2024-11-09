// src/components/layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-primary text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h3 m-0">Mi Gimnasio</h1>
        <nav>
          <Link to="/challenges" className="text-white me-3">
            Desafíos
          </Link>
          {/* Enlaces directos para activar desafíos con parámetros de tipo */}
          <Link to="/activate-challenge?type=press-banca" className="text-white me-3">
            Activar Press Banca
          </Link>
          <Link to="/activate-challenge?type=sentadillas" className="text-white me-3">
            Activar Sentadillas
          </Link>
          <Link to="/activate-challenge?type=peso-muerto" className="text-white me-3">
            Activar Peso Muerto
          </Link>
          {/* Otros enlaces generales */}
          <Link to="/profile" className="text-white me-3">
            Perfil
          </Link>
          <Link to="/logout" className="text-white">
            Cerrar Sesión
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
