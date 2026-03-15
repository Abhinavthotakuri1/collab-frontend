import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail]           = useState("");
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [error, setError]           = useState("");
  const { login, register }         = useAuth();
  const navigate                    = useNavigate();
  const user                        = useSelector((s) => s.auth.user);

  // Already logged in → go to dashboard
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await register(email, username, password);
      } else {
        await login(email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data ||
        "Something went wrong. Is the backend running?"
      );
    }
  };

  const inputStyle = {
    padding: "10px 14px", borderRadius: "8px",
    border: "1px solid #1e293b", background: "#0f172a",
    color: "white", fontSize: "14px", outline: "none", width: "100%"
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center",
      height: "100vh", background: "#0f172a"
    }}>
      <form onSubmit={handleSubmit} style={{
        display: "flex", flexDirection: "column", gap: "14px",
        background: "#020617", padding: "2.5rem", borderRadius: "12px",
        width: "340px", border: "1px solid #1e293b"
      }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#38bdf8" }}>
          ⚡ CollabCode
        </div>
        <h2 style={{ fontSize: "18px", color: "#e2e8f0" }}>
          {isRegister ? "Create Account" : "Sign In"}
        </h2>

        {error && (
          <div style={{
            background: "#450a0a", color: "#fca5a5",
            padding: "8px 12px", borderRadius: "6px", fontSize: "13px"
          }}>
            {error}
          </div>
        )}

        <input
          type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          style={inputStyle} required
        />
        {isRegister && (
          <input
            placeholder="Username"
            value={username} onChange={(e) => setUsername(e.target.value)}
            style={inputStyle} required
          />
        )}
        <input
          type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          style={inputStyle} required
        />

        <button type="submit" style={{
          padding: "11px", background: "#0ea5e9", color: "white",
          border: "none", borderRadius: "8px", cursor: "pointer",
          fontSize: "14px", fontWeight: "500"
        }}>
          {isRegister ? "Register" : "Login"}
        </button>

        <p onClick={() => { setIsRegister(!isRegister); setError(""); }}
          style={{
            textAlign: "center", fontSize: "13px",
            color: "#64748b", cursor: "pointer"
          }}>
          {isRegister ? "Already have an account? Sign in" : "No account? Register"}
        </p>
      </form>
    </div>
  );
}

export default Login;