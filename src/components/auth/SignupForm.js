import React, { useState } from 'react';
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);   // Estado de carga
        setError(null);     // Limpia el error previo
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');   // Redirige al usuario a la ruta de inicio
        } catch (error) {
            setError("No se pudo crear la cuenta. Verifica tus datos e intenta nuevamente.");
        }
        setLoading(false);  // Finaliza el estado de carga
    };
  
    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4 fw-bold">Registro</h3>

                {error && (
                    <div className="alert alert-danger" role="alert" aria-live="polite">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup}>
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
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Crea una contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <button onClick={() => navigate("/login")} className="btn btn-link text-decoration-none">
                        ¿Ya tienes una cuenta? Inicia sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
