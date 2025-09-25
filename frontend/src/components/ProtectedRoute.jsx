import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {

  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" replace />;
  }

  return children;
};
