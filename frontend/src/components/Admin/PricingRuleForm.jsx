import React, { useState } from "react";
import { rulesAPI } from "../../api/api";

export default function PricingRuleForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("peak");
  const [multiplier, setMultiplier] = useState("");
  const [surcharge, setSurcharge] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await rulesAPI.create({
        name,
        type,
        multiplier: Number(multiplier),
        surcharge: Number(surcharge),
      });
      alert("Rule added!");
      setName(""); setMultiplier(""); setSurcharge("");
    } catch (err) {
      alert(err.response?.data?.error || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-7 hover:shadow-2xl transition">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        Add Pricing Rule
      </h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Rule name (e.g. Peak Hours)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="peak">Peak Hours</option>
          <option value="weekend">Weekend</option>
          <option value="holiday">Holiday</option>
          <option value="court_type">Court Type</option>
          <option value="early_bird">Early Bird</option>
        </select>
        <input
          type="number"
          step="0.1"
          min="0.1"
          placeholder="Multiplier (e.g. 1.5 = +50%)"
          value={multiplier}
          onChange={(e) => setMultiplier(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
          required
        />
        <input
          type="number"
          placeholder="Fixed surcharge (₹)"
          value={surcharge}
          onChange={(e) => setSurcharge(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-xl transition transform hover:scale-105 shadow-lg"
        >
          {loading ? "Adding..." : "Add Rule"}
        </button>
      </form>
    </div>
  );
}