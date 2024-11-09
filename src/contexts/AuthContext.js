// src/context/AuthContext.js

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../services/firebase"; 

import { onAuthStateChanged } from "firebase/auth";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación para toda la aplicación
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
