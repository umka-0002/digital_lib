import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/AuthContext";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (ok) {
      navigate("/"); // перенаправить на главную
    } else {
      setErr("Неверный логин или пароль");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Логин" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Пароль" />
      <button type="submit">Войти</button>
      {err && <div style={{color:"red"}}>{err}</div>}
    </form>
  );
};