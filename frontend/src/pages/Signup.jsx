import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

import { useEffect } from "react";

export default function Signup() {
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


  const handleSignup = async () => {
    try {
      await axios.post("/auth/signup", { email, password });
      alert("User registered, please login");
      nav("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
