import React from 'react';
import { Medal, Award, Trophy, Dumbbell, Zap } from 'lucide-react';
import { useChallenges } from '../../contexts/ChallengeContext';
import Layout from '../layout/Layout';


const GymChallengeApp = () => {
  const { challenges, addChallenge } = useChallenges();
  const [user, setUser] = React.useState({
    name: 'Usuario Demo',
    points: 0,
    level: 1,
    completedChallenges: 0,
  });

  const handleNFCDetection = () => {
    const newChallenge = {
      id: challenges.length + 1,
      title: ['Press Banca', 'Sentadillas', 'Peso Muerto'][Math.floor(Math.random() * 3)],
      type: ['fuerza', 'resistencia', 'velocidad'][Math.floor(Math.random() * 3)],
      points: Math.floor(Math.random() * 50) + 10,
      difficulty: ['principiante', 'intermedio', 'avanzado'][Math.floor(Math.random() * 3)],
      completed: false,
      timestamp: new Date().toISOString(),
    };

    const isDuplicate = challenges.some(
      (challenge) => challenge.title === newChallenge.title && challenge.type === newChallenge.type
    );

    if (!isDuplicate) {
      addChallenge(newChallenge);
    } else {
      alert("Desafío ya existe y no se agregará.");
    }
  };

  const completeChallenge = (challengeId) => {
    const challengeToComplete = challenges.find((c) => c.id === challengeId);
    if (challengeToComplete && !challengeToComplete.completed) {
      setUser((prevUser) => ({
        ...prevUser,
        points: prevUser.points + challengeToComplete.points,
        completedChallenges: prevUser.completedChallenges + 1,
        level: Math.floor((prevUser.points + challengeToComplete.points) / 100) + 1,
      }));
    }
  };

  return (
    <Layout>
    <div className="container my-4">
      <div className="card mb-4 text-white" style={{ background: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }}>
        <div className="card-body text-center">
          <h2 className="card-title mb-2">{user.name}</h2>
          <div className="d-flex justify-content-center gap-4 mt-2">
            <div className="d-flex align-items-center gap-2">
              <Trophy size={20} />
              <span>{user.points} puntos</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Medal size={20} />
              <span>Nivel {user.level}</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Award size={20} />
              <span>{user.completedChallenges} completados</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <button 
          onClick={handleNFCDetection}
          className="btn text-white"
          style={{ background: 'linear-gradient(90deg, #22c55e, #16a34a)' }}
        >
          <Zap size={20} className="mr-2" />
          Simular Escaneo NFC
        </button>
      </div>

      <div className="row">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="col-md-6 mb-4">
            <div className={`card shadow-sm ${challenge.completed ? 'border-success' : ''}`}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-light p-2 rounded-circle">
                      <Dumbbell size={24} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="card-title mb-1">{challenge.title}</h5>
                      <div className="d-flex gap-2">
                        <span className="badge bg-secondary">{challenge.type}</span>
                        <span className="badge bg-light text-dark">{challenge.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold text-primary fs-4">{challenge.points}</div>
                    <small className="text-muted">puntos</small>
                  </div>
                </div>
                {!challenge.completed ? (
                  <button
                    onClick={() => completeChallenge(challenge.id)}
                    className="btn btn-outline-primary btn-sm mt-3"
                  >
                    Completar
                  </button>
                ) : (
                  <div className="text-success d-flex align-items-center gap-2 mt-3">
                    <Trophy size={20} />
                    Completado
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default GymChallengeApp;
