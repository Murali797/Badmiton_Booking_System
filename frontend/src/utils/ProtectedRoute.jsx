// utils/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// Replace this with your actual auth check (e.g. context, localStorage, redux, etc.)
const isAuthenticated = () => {
  return localStorage.getItem("token") || localStorage.getItem("user"); // adjust based on your auth
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    // Redirect to auth, and remember where they wanted to go
    return <Navigate to="/auth" replace state={{ from: window.location.pathname }} />;
  }
  return children;
}