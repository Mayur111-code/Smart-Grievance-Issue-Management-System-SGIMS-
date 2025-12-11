import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  // role = optional expected role string, e.g. "admin" or "department"
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    // not logged in
    return <Navigate to="/admin/login" replace />;
  }

  if (role && userRole !== role) {
    // logged in but not the required role
    // redirect to their home page based on role
    if (userRole === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (userRole === "department") return <Navigate to="/officer/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
