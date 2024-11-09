// src/components/Challenges/ActivateChallenge.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useChallenges } from '../../contexts/ChallengeContext';
import { useAuth } from '../../contexts/AuthContext';
import { predefinedChallenges } from '../../data/challengesData';
import Layout from '../layout/Layout';

const ActivateChallenge = () => {
  const { addChallenge, challenges } = useChallenges();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [challenge, setChallenge] = useState(null);
  const [alreadyActivated, setAlreadyActivated] = useState(false);

  // Captura el parámetro "type" de la URL
  const queryParams = new URLSearchParams(location.search);
  const challengeType = queryParams.get('type');

  useEffect(() => {
    if (!currentUser) {
      navigate("/"); // Redirige al inicio de sesión si no está autenticado
      return;
    }

    // Encuentra el desafío basado en `type`
    const foundChallenge = predefinedChallenges.find(
      (ch) => ch.title.toLowerCase() === challengeType?.toLowerCase()
    );

    if (foundChallenge) {
      setChallenge(foundChallenge);

      // Verifica si el desafío ya está activado
      const isActivated = challenges.some(
        (ch) => ch.title.toLowerCase() === foundChallenge.title.toLowerCase()
      );
      setAlreadyActivated(isActivated);
    }
  }, [currentUser, challengeType, challenges, navigate]);

  // Maneja la activación del desafío
  const handleActivateChallenge = () => {
    if (challenge && !alreadyActivated) {
      addChallenge({
        ...challenge,
        id: Math.floor(Math.random() * 1000), // Genera un ID único
        completed: false,
      });
      navigate('/challenges'); // Redirige a la lista de desafíos
    }
  };

  return (
    <Layout>
    <div className="text-center mt-5">
      {challenge ? (
        <div>
          <h2>Activar Desafío: {challenge.title}</h2>
          <p>Tipo: {challenge.type}</p>
          <p>Dificultad: {challenge.difficulty}</p>
          <p>Puntos: {challenge.points}</p>
          {alreadyActivated ? (
            <div className="text-success mt-3">Este desafío ya está activado.</div>
          ) : (
            <button onClick={handleActivateChallenge} className="btn btn-primary mt-3">
              Activar Desafío
            </button>
          )}
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          Desafío no encontrado
        </div>
      )}
    </div>
    </Layout>
  );
};

export default ActivateChallenge;
