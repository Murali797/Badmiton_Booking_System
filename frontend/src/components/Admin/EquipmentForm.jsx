import React, { useState } from "react";
import { equipmentAPI } from "../../api/api";

export default function EquipmentForm() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await equipmentAPI.create({
        name,
        totalQuantity: Number(quantity),
        price: Number(price),
      });
      alert("Equipment added!");
      setName(""); setQuantity(""); setPrice("");
    } catch (err) {
      alert(err.response?.response?.data?.error || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-7 hover:shadow-2xl transition">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        Add Equipment
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Item name (e.g. Yonex Racket)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
        <input
          type="number"
          min="1"
          placeholder="Total quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
        <input
          type="number"
          min="0"
          step="10"
          placeholder="Rental price per use (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-20 w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl transition transform hover:scale-105 shadow-lg"
        >
          {loading ? "Adding..." : "Add Equipment"}
        </button>
      </form>
    </div>
  );
}