import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="h-16 bg-white shadow-sm fixed top-0 left-0 right-0 z-50 border-b">
      <div className="flex items-center justify-between h-full px-6">

       
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-indigo-600">
          <span className="text-4xl">🏸</span>
          <span>SmashBook</span>
        </Link>

        
        {user && token && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-6">
            <input
              type="text"
              placeholder="Search courts, bookings, coaches..."
              className="w-full px-5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        )}

        
        <div className="flex items-center gap-6">
          {user && token ? (
            <>
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                Hi, {user.name.split(" ")[0]}!👋
              </span>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth")}
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/auth", { state: { register: true } })}
                className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg transition"
              >
                Sign Up Free
              </button>
            </>
          )}
        </div>
      </div>

      
      <div className={`h-16 ${user && token ? "ml-56" : ""}`} />
    </header>
  );
}