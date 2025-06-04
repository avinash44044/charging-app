import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  // 🔐 Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      nav("/home", { replace: true });
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      nav("/home", { replace: true });
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <h1>"charging station app"</h1>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <p onClick={() => nav("/signup")}>Don't have an account? Signup</p>
    </div>
  );
}
