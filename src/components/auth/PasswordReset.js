import React, { useState } from "react";
import { auth } from "../../services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Se ha enviado un enlace de recuperación a tu email.");
    } catch (error) {
      setError("No se pudo enviar el enlace. Verifica tu email e intenta nuevamente.");
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 fw-bold">Recuperar Contraseña</h3>

        {message && (
          <div className="alert alert-success" role="alert" aria-live="polite">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <form onSubmit={handlePasswordReset}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Enviando..." : "Enviar enlace de recuperación"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button onClick={() => window.history.back()} className="btn btn-link text-decoration-none">
            Volver a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
