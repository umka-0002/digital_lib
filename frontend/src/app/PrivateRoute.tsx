import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { access } = useAuth();
  return access ? children : <Navigate to="/login" />;
};