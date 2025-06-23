import { useAuth } from "../../../app/AuthContext";

export const LogoutButton = () => {
  const { logout } = useAuth();
  return <button onClick={logout}>Выйти</button>;
};