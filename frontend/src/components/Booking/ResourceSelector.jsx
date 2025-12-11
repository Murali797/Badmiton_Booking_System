import React from "react";

export default function ResourceSelector({ selected, setSelected, courts, coaches, equipment }) {
  const updateEquipment = (eqId, qty) => {
    const cleaned = selected.equipments.filter((e) => e.equipmentId !== eqId);
    if (qty > 0) cleaned.push({ equipmentId: eqId, quantity: qty });
    setSelected({ ...selected, equipments: cleaned });
  };

  return (
    <div className="space-y-6">
      {/* Court */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Court
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courts.map((court) => (
            <button
              key={court.id}
              onClick={() => setSelected({ ...selected, courtId: court.id })}
              className={`p-5 rounded-xl border-2 text-left transition-all
                ${selected.courtId === court.id
                  ? "border-indigo-600 bg-indigo-50 shadow-md"
                  : "border-gray-300 hover:border-indigo-400 hover:shadow"
                }`}
            >
              <h4 className="font-semibold text-gray-900">{court.name}</h4>
              <p className="text-sm text-gray-600">{court.type} • ₹{court.basePrice}/hr</p>
              {court.location && <p className="text-xs text-gray-500 mt-1">{court.location}</p>}
            </button>
          ))}
        </div>
      </div>

      {/* Coach */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Add Coach (Optional)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setSelected({ ...selected, coachId: null })}
            className={`p-4 rounded-xl border-2 transition-all
              ${!selected.coachId ? "border-indigo-600 bg-indigo-50" : "border-gray-300"}`}
          >
            <span className="block font-medium">No Coach</span>
            <span className="text-sm text-gray-600">Save money</span>
          </button>

          {coaches.map((coach) => (
            <button
              key={coach.id}
              onClick={() => setSelected({ ...selected, coachId: coach.id })}
              className={`p-4 rounded-xl border-2 transition-all
                ${selected.coachId === coach.id
                  ? "border-indigo-600 bg-indigo-50 shadow-md"
                  : "border-gray-300 hover:border-indigo-400"
                }`}
            >
              <span className="block font-medium">{coach.name}</span>
              <span className="text-sm text-indigo-600 font-semibold">+₹{coach.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Equipment */}
      {equipment.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Equipment Rental
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {equipment.map((eq) => {
              const qty = selected.equipments.find((e) => e.equipmentId === eq.id)?.quantity || 0;

              return (
                <div key={eq.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{eq.name}</span>
                    <span className="text-sm text-gray-600">₹{eq.price} each</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateEquipment(eq.id, Math.max(0, qty - 1))}
                      className="w-8 h-8 rounded-full bg-white border hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-semibold">{qty}</span>
                    <button
                      onClick={() => updateEquipment(eq.id, qty + 1)}
                      className="w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}