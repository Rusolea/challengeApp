// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChallengeProvider } from './contexts/ChallengeContext';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import PasswordReset from './components/auth/PasswordReset';
import GymChallengeApp from './components/Challenges/GymChallengeApp';
import ActivateChallenge from './components/Challenges/ActivateChallenge';

// Ruta privada para proteger las rutas sensibles
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <ChallengeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            {/* Rutas protegidas por PrivateRoute */}
            <Route path="/challenges" element={<PrivateRoute><GymChallengeApp /></PrivateRoute>} />
            {/* <Route path="/activate-challenge" element={<PrivateRoute><ActivateChallenge /></PrivateRoute>} /> */}
            <Route path="/activate-challenge" element={<PrivateRoute><ActivateChallenge /></PrivateRoute>} />

          </Routes>
        </Router>
      </ChallengeProvider>
    </AuthProvider>
  );
}

export default App;
