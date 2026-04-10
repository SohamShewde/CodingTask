import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Private = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Private;