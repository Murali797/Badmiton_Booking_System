import React from "react";
import dayjs from "dayjs";

export default function TimeSlotGrid({ selected, setSelected }) {
  const date = selected.date || dayjs().format("YYYY-MM-DD");
  const slots = Array.from({ length: 15 }, (_, i) => i + 6); // 6 AM to 8 PM

  const getSlotLabel = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:00 ${period}`;
  };

  const isSlotSelected = (hour) => {
    if (!selected.startTime) return false;
    const slotTime = `${date}T${String(hour).padStart(2, "0")}:00:00.000Z`;
    return selected.startTime === slotTime;
  };

  const handleSlotClick = (hour) => {
    const start = `${date}T${String(hour).padStart(2, "0")}:00:00.000Z`;
    const end = new Date(new Date(start).getTime() + selected.duration * 60000).toISOString();
    setSelected({ ...selected, startTime: start, endTime: end });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Select Time Slot
      </h3>

      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
        {slots.map((hour) => {
          const isSelected = isSlotSelected(hour);
          const isPast = selected.date && new Date(`${date}T${String(hour).padStart(2, "0")}:00`) < new Date();

          return (
            <button
              key={hour}
              disabled={isPast && selected.date <= dayjs().format("YYYY-MM-DD")}
              onClick={() => handleSlotClick(hour)}
              className={`py-3 px-2 rounded-xl text-sm font-medium transition-all
                ${isSelected
                  ? "bg-indigo-600 text-white shadow-lg scale-105"
                  : isPast && selected.date <= dayjs().format("YYYY-MM-DD")
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 hover:border-indigo-500 hover:shadow-md"
                }`}
            >
              {getSlotLabel(hour)}
            </button>
          );
        })}
      </div>

      {selected.startTime && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
          <p className="text-indigo-800 font-medium">
            Selected: {dayjs(selected.startTime).format("ddd, MMM D • h:mm A")} –{" "}
            {dayjs(selected.endTime).format("h:mm A")} ({selected.duration} min)
          </p>
        </div>
      )}
    </div>
  );
}