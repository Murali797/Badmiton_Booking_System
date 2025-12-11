import React from "react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "Home", to: "/" },
  { label: "Book Court", to: "/booking" },
  { label: "My Bookings", to: "/mybookings" },
  { label: "Admin", to: "/admin" },
  { label: "Auth", to: "/auth" },
];

export default function Sidebar() {
  const loc = useLocation();
  return (
    <aside className="w-56 bg-indigo-900 min-h-screen text-white fixed left-0 top-0">
      <div className="p-6 text-xl font-bold">SmashBook</div>
      <nav className="mt-6">
        {items.map((it) => (
          <Link key={it.to} to={it.to}>
            <div
              className={
                "px-6 py-3 hover:bg-indigo-700 " +
                (loc.pathname === it.to ? "bg-indigo-800" : "")
              }
            >
              {it.label}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
