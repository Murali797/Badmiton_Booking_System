import React from "react";
import CourtForm from "../components/Admin/CourtForm";
import CoachForm from "../components/Admin/CoachForm";
import EquipmentForm from "../components/Admin/EquipmentForm";
import PricingRuleForm from "../components/Admin/PricingRuleForm";

export default function AdminDashboard(){
  return (
    <div className=" p-8 pt-20 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        <CourtForm/>
        <EquipmentForm/>
        <CoachForm/>
        <PricingRuleForm/>
      </div>
    </div>
  );
}
