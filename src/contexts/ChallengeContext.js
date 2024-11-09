// src/context/ChallengeContext.js
import React, { createContext, useContext, useState } from 'react';

const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [challenges, setChallenges] = useState([]);

  const addChallenge = (challenge) => {
    setChallenges((prevChallenges) => [...prevChallenges, challenge]);
  };

  return (
    <ChallengeContext.Provider value={{ challenges, addChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = () => useContext(ChallengeContext);
