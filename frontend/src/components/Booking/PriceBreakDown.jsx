import React, { useEffect, useState } from "react";

export default function PriceBreakdown({ selected, courts, coaches, equipment }) {
  const [breakdown, setBreakdown] = useState({ items: [], total: 0 });

  useEffect(() => {
    const court = courts.find((c) => c.id === selected.courtId);
    const coach = coaches.find((c) => c.id === selected.coachId);

    const items = [];
    let total = 0;

    if (court) {
      const hours = selected.duration / 60;
      const courtPrice = court.basePrice * hours;
      items.push({ label: `${court.name} (${selected.duration} min)`, price: courtPrice });
      total += courtPrice;
    }

    if (coach) {
      items.push({ label: `Coach: ${coach.name}`, price: coach.price });
      total += coach.price;
    }

    selected.equipments.forEach((e) => {
      const eq = equipment.find((x) => x.id === e.equipmentId);
      if (eq) {
        items.push({ label: `${eq.name} × ${e.quantity}`, price: eq.price * e.quantity });
        total += eq.price * e.quantity;
      }
    });

    setBreakdown({ items, total });
  }, [selected, courts, coaches, equipment]);

  if (!selected.courtId) return null;

  return (
    <div className=" from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>

      <div className="space-y-3">
        {breakdown.items.map((item, i) => (
          <div key={i} className="flex justify-between text-gray-700">
            <span>{item.label}</span>
            <span className="font-medium">₹{item.price}</span>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-indigo-300 mt-5 pt-4">
        <div className="flex justify-between text-xl font-bold text-indigo-700">
          <span>Total Amount</span>
          <span>₹{breakdown.total}</span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 italic">
        Final price calculated on server at booking time
      </p>
    </div>
  );
}