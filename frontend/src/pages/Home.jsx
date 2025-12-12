

import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return !!localStorage.getItem("token") || !!localStorage.getItem("user");
  };

  const handleBookNow = () => {
    if (isAuthenticated()) {
      navigate("/booking");
    } else {
      navigate("/auth", { state: { from: "/booking" } });
    }
  };

  

  const handleSignUp = () => {
    navigate("/auth", { state: { register: true } }); 
  };

  return (
    <div className="min-h-screen  from-indigo-50 via-white to-purple-50">
      <div>
        
        <section className="pt-32 pb-20 px-6 text-center from-indigo-50 to-white">
  <div className="max-w-5xl mx-auto">
    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
      Book Badminton Courts<br />
      <span className="text-transparent bg-clip-text from-indigo-600 to-purple-600">
        Instantly & Hassle-Free
      </span>
    </h1>
    <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
      Courts • Coaches • Equipment — everything in one app.
    </p>

    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
      <button onClick={handleBookNow} className="px-10 py-5 bg-indigo-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition">
        Book Now
      </button>
      <button onClick={handleBookNow} className="px-10 py-5 bg-white text-indigo-600 border-4 border-indigo-600 text-xl font-bold rounded-2xl hover:bg-indigo-50 transition">
        Find a Coach
      </button>
    </div>
  </div>
</section>

       
<section className="py-20 bg-indigo-600 text-center text-white -mx-6 md:-mx-12 lg:-mx-24 xl:-mx-32 2xl:mx-0">
  <div className="max-w-4xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Ready to smash it?
    </h2>
    <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto">
      Join thousands of players booking courts and coaches instantly.
    </p>
    <button
      onClick={handleSignUp}
      className="px-12 py-5 bg-white text-indigo-600 font-bold text-xl rounded-xl hover:bg-gray-100 transition shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105"
    >
      Create Free Account
    </button>
  </div>
</section>
      </div>
    </div>
  );
}