// src/components/auth/LoginForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../services/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuth } from '../../contexts/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Redirige si el usuario ya está autenticado
  useEffect(() => {
    if (currentUser) {
      navigate("/challenges");
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/challenges"); // Redirige una vez que se autentique exitosamente
    } catch (error) {
      setError("Ocurrió un error. Intenta de nuevo.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/challenges"); // Redirige después de la autenticación con Google
    } catch (error) {
      setError("Ocurrió un error. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 fw-bold">Iniciar Sesión</h3>

        {error && (
          <div className="alert alert-danger" role="alert" aria-live="polite">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            id="password"
            label="Contraseña"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="text-center my-4">
          <span className="text-muted">o</span>
        </div>

        <button onClick={handleGoogleLogin} className="btn btn-danger w-100 mb-3" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión con Google"}
        </button>
      </div>
    </div>
  );
}

// Componente InputField reutilizable para manejar campos de entrada
function InputField({ id, label, type, value, onChange, placeholder }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default LoginForm;
