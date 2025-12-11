import React, { useState } from "react";
import { courtsAPI } from "../../api/api";

export default function CourtForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("indoor");
  const [basePrice, setBasePrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await courtsAPI.create({ name, type, basePrice: Number(basePrice) });
      alert("Court added!");
      setName("");
      setBasePrice("");
    } catch (err) {
      alert(err.response?.data?.error || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-7 hover:shadow-2xl transition">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        Add New Court
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Court Name</label>
          <input
            type="text"
            placeholder="Court 1, Badminton Hall A"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Court Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="clay">Clay (Tennis)</option>
            <option value="hard">Hard Court</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Base Price / Hour (₹)</label>
          <input
            type="number"
            placeholder="600"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition transform hover:scale-105 shadow-lg"
        >
          {loading ? "Adding..." : "Add Court"}
        </button>
      </form>
    </div>
  );
}