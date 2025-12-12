// pages/LoginRegister.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../api/api";

export default function LoginRegister() {
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();
  const location = useLocation();

 
  const from = location.state?.from || "/booking";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (tab === "register" && !form.name)) {
      return alert("Please fill all fields");
    }

    setLoading(true);
    try {
      let res;
      if (tab === "login") {
        res = await auth.login({ email: form.email, password: form.password });
      } else {
        res = await auth.register(form);
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

    
      alert(tab === "login" ? "Welcome back!" : "Account created & logged in!");


      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.error || err.message || "Something went wrong";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (location.state?.register) {
      setTab("register");
    }
  }, [location.state]);

  return (
    <div className="min-h-screen  from-indigo-50 to-purple-50 pt-20">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
         
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              {tab === "login" ? "Welcome Back" : "Create Account"}
            </h2>

          
            <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                  tab === "login"
                    ? "bg-white text-indigo-600 shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                  tab === "register"
                    ? "bg-white text-indigo-600 shadow-md"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
             
              {tab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    required={tab === "register"}
                  />
                </div>
              )}

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              
              {tab === "register" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="user">Player (User)</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

           
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all transform hover:scale-105 shadow-lg ${
                  loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                }`}
              >
                {loading
                  ? "Please wait..."
                  : tab === "login"
                  ? "Sign In"
                  : "Create Account & Login"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              {tab === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setTab("register")}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Register here
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setTab("login")}
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}