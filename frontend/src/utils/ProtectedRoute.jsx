// utils/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // true if token exists
};

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  

  return children;
}
