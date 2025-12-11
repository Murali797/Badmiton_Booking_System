// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/SharedPage/Sidebar";
import Navbar from "./components/SharedPage/Navbar";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import LoginRegister from "./pages/LoginRegister";
import ProtectedRoute from "./utils/ProtectedRoute"; // <-- new

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 ml-0 md:ml-64"> {/* This fixes your sidebar overlap */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<LoginRegister />} />

            {/* Protected Routes - Only accessible if logged in */}
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mybookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}