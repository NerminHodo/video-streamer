import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function ProtectedRoute({ children }) {

  const {user}= useContext(UserContext)


  if (Object.keys(user).length === 0) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
