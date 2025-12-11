import React, { useState } from "react";
import { coachesAPI } from "../../api/api";

export default function CoachForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) return alert("Fill all fields");

    setLoading(true);
    try {
      await coachesAPI.create({ name, price: Number(price) });
      alert("Coach added successfully!");
      setName("");
      setPrice("");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add coach");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-7 hover:shadow-2xl transition">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        Add New Coach
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Coach Name</label>
          <input
            type="text"
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate (₹)</label>
          <input
            type="number"
            min="0"
            step="50"
            placeholder="800"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-20 w-full py-3.5 rounded-xl font-bold text-white transition-all transform hover:scale-105 shadow-lg ${
            loading ? "bg-indigo-400 cursor-wait" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Adding..." : "Add Coach"}
        </button>
      </form>
    </div>
  );
}