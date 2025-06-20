import React, { useState } from "react";
import axios from "axios";
import { useSetAtom } from "jotai";
import { userAtom } from "../../../entities/user/model/userAtom";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetAtom(userAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/token/", { username, password });
    setUser({ token: res.data.access });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input placeholder="Логин" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="btn btn-primary">Войти</button>
    </form>
  );
};