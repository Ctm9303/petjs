import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="petjs-page">
      <h2>Register</h2>
      <div className="petjs-form">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
        />
        {error ? <div style={{ color: "crimson" }}>{error}</div> : null}
        <button
          className="petjs-btn petjs-btn-primary"
          onClick={() => {
            setError("");
            try {
              register({ name, email, password });
              navigate("/checkout", { replace: true });
            } catch (e) {
              setError(e?.code || e?.message || "REGISTER_FAILED");
            }
          }}
        >
          Create account
        </button>
        <div className="petjs-muted">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

