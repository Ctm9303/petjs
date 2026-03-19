import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/checkout";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="petjs-page">
      <h2>Login</h2>
      <div className="petjs-form">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        {error ? <div style={{ color: "crimson" }}>{error}</div> : null}
        <button
          className="petjs-btn petjs-btn-primary"
          onClick={() => {
            setError("");
            try {
              login({ email, password });
              navigate(redirectTo, { replace: true });
            } catch (e) {
              setError(e?.code || e?.message || "LOGIN_FAILED");
            }
          }}
        >
          Login
        </button>
        <div className="petjs-muted">
          No account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}

