import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem("token");

  const isLoggedIn = Boolean(user && token);
  const firstName = user?.name?.split(" ")[0] || "";
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-4xl">🏸</span>
              <span className="text-2xl font-bold text-indigo-600">
                SmashBook
              </span>
            </Link>

            {/* Desktop Search */}
            {isLoggedIn && (
              <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courts, bookings, coaches..."
                    className="w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <span className="text-gray-700 font-medium">Hi, {firstName}!</span>
                  <button
                    onClick={logout}
                    className="px-5 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition"
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

            {/* Mobile Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="md:hidden border-t border-gray-200 bg-white animate-slideDown">
            <div className="px-6 py-5 space-y-5">

              {isLoggedIn && (
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {isLoggedIn ? (
                <div className="space-y-4">
                  <div className="text-lg font-medium text-gray-800">
                    Hi, {firstName}!
                  </div>
                  <button
                    onClick={logout}
                    className="w-full py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/auth")}
                    className="w-full py-3 border-2 border-indigo-600 text-indigo-600 font-medium rounded-xl hover:bg-indigo-50"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/auth", { state: { register: true } })}
                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700"
                  >
                    Sign Up Free
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="h-16" />
    </>
  );
}
