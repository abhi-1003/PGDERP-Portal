import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  let token = localStorage.getItem("pgderp-website-jwt");
  const role = localStorage.getItem("pgderp-website-role");
  if (!(allowedRoles.includes(role) && token)) {
    localStorage.clear();
    return <Navigate to="/" />;
  }
//   console.log(token, role)
  return children;
};

export default ProtectedRoute;