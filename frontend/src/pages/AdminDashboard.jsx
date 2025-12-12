import React from "react";
import CourtForm from "../components/Admin/CourtForm";
import CoachForm from "../components/Admin/CoachForm";
import EquipmentForm from "../components/Admin/EquipmentForm";
import PricingRuleForm from "../components/Admin/PricingRuleForm";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen  from-indigo-50 via-white to-purple-50 pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Manage courts, coaches, equipment & pricing rules
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6 lg:gap-8">
          <div className="h-full">
            <CourtForm />
          </div>
          <div className="h-full">
            <CoachForm />
          </div>
          <div className="h-full">
            <EquipmentForm />
          </div>
          <div className="h-full">
            <PricingRuleForm />
          </div>
        </div>

        {/* Optional: Extra spacing at bottom on mobile */}
        <div className="h-20" />
      </div>
    </div>
  );
}