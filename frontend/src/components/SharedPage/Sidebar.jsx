import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const items = [
  { label: "Home", to: "/" },
  { label: "Book Court", to: "/booking" },
  { label: "My Bookings", to: "/mybookings" },
  { label: "Admin", to: "/admin" },
  { label: "Auth", to: "/auth" },
];

export default function Sidebar() {
  const loc = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Menu Button (visible only on small screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 bg-indigo-900 text-white p-3 rounded-lg shadow-lg lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-indigo-800">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            SmashBook
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {items.map((it) => (
            <Link key={it.to} to={it.to} onClick={() => setIsOpen(false)}>
              <div
                className={`px-6 py-4 text-lg font-medium transition-all hover:bg-indigo-800 flex items-center
                  ${loc.pathname === it.to ? "bg-indigo-800 border-l-4 border-white" : ""}`}
              >
                {it.label}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay when mobile menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}