// import { useAuth } from "./../context/AuthContext";
// import { useAuth } from "../services/firebase"; 
import { useAuth } from "../contexts/AuthContext";




import React from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";

function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirige a login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Home</h1>
      {currentUser ? (
        <>
          <p>Hello, {currentUser.email}</p>
          <button onClick={handleLogout} style={{ marginTop: "10px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>Bienvenido, invitado. Por favor, inicia sesión o regístrate.</p>
          <button onClick={() => navigate("/login")} style={{ margin: "5px" }}>
            Login
          </button>
          <button onClick={() => navigate("/signup")} style={{ margin: "5px" }}>
            Registro
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
