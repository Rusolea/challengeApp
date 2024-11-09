import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../services/firebase";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";


function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                setError("La contraseña es incorrecta.");
            } else if (error.code === 'auth/user-not-found') {
                setError("No se encontró una cuenta con este email.");
            } else {
                setError("Ocurrió un error inesperado. Por favor intenta de nuevo.");
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate("/");
        } catch (error) {
            setError("Ocurrió un error inesperado con Google. Por favor intenta de nuevo.");
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow p-4 login-card">
                <h3 className="text-center mb-4 fw-bold">Iniciar Sesión</h3>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

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

                    <button type="submit" className="btn btn-primary w-100 mb-3">
                        Iniciar Sesión
                    </button>
                </form>

                <div className="text-center my-4">
                    <span className="text-muted">o</span>
                </div>

                <button onClick={handleGoogleLogin} className="btn btn-danger w-100 mb-3">
                    Iniciar sesión con Google
                </button>

                <div className="text-center">
                    <p className="text-muted small mb-2">
                        ¿Olvidaste tu contraseña?{" "}
                        <span onClick={() => navigate("/password-reset")} className="text-primary" style={{ cursor: 'pointer' }}>
                            Recuperar
                        </span>
                    </p>
                    <p className="text-muted small">
                        ¿No tienes una cuenta?{" "}
                        <span onClick={() => navigate("/signup")} className="text-primary" style={{ cursor: 'pointer' }}>
                            Regístrate
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

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
