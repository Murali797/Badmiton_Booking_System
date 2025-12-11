import React, { useEffect, useState } from "react";
import { bookingsAPI } from "../api/api";
import { Calendar, Clock, IndianRupee, AlertCircle } from "lucide-react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    bookingsAPI
      .getByUser(user.email)
      .then((r) => {
        setBookings(r.data || []);
      })
      .catch(() => {
        setBookings([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!user) {
    return (
      <div className="p-8 pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto text-center py-20">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700">Not Logged In</h3>
          <p className="text-gray-500 mt-2">Please log in to view your bookings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" p-8 pt-20 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">Manage and track all your court bookings</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-64"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700">No Bookings Yet</h3>
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Looks like you haven't booked any courts yet. When you do, they'll appear here!
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
              Browse Courts
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((b, idx) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start">
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {b.court?.name || "Unknown Court"}
                        </h3>
                        <div className="flex items-center gap-4 mt-3 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">
                              {new Date(b.startTime).toLocaleDateString("en-IN", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <span className="text-sm">
                            {new Date(b.startTime).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })} -{" "}
                            {new Date(b.endTime || b.startTime).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-2xl font-bold text-gray-900">
                        <IndianRupee className="w-6 h-6" />
                        {b.totalPrice}
                      </div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                        b.status
                      )}`}
                    >
                      {b.status || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}