import React from "react";
import { CalendarDays, Clock } from "lucide-react"; // Optional: npm i lucide-react  OR just use emojis below

export default function DateSelector({ selected, setSelected }) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <div className="relative">
          <input
            type="date"
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={selected.date || ""}
            onChange={(e) =>
              setSelected({ ...selected, date: e.target.value, startTime: null, endTime: null })
            }
          />
        </div>
      </div>

      <div className="w-full sm:w-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration
        </label>
        <select
          className="px-6 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition min-w-[140px]"
          value={selected.duration || 60}
          onChange={(e) =>
            setSelected({
              ...selected,
              duration: Number(e.target.value),
              endTime: null, // reset time when duration changes
            })
          }
        >
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={90}>1.5 hours</option>
          <option value={120}>2 hours</option>
        </select>
      </div>
    </div>
  );
}