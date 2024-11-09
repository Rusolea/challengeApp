// src/components/auth/PasswordReset.js
import React, { useState } from "react";
import { auth } from "../../services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";


function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Se ha enviado un enlace de recuperación a tu email.");
      setError(null);
    } catch (error) {
      setError(error.message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Recuperar Contraseña</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handlePasswordReset}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Enviar enlace de recuperación</button>
      </form>
    </div>
  );
}

export default PasswordReset;
