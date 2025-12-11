import React, { useEffect, useState } from "react";
import DateSelector from "../components/Booking/DateSelector";
import TimeSlotGrid from "../components/Booking/TimeSlotGrid";
import ResourceSelector from "../components/Booking/ResourceSelector";
import PriceBreakdown from "../components/Booking/PriceBreakDown";
import { courtsAPI, coachesAPI, equipmentAPI, bookingsAPI } from "../api/api";

export default function BookingPage(){
  const [courts,setCourts] = useState([]);
  const [coaches,setCoaches] = useState([]);
  const [equipment,setEquipment] = useState([]);
  const [selected,setSelected] = useState({ date:null, duration:60, startTime:null, endTime:null, courtId:null, coachId:null, equipments:[] });

  useEffect(()=>{ courtsAPI.getAll().then(r=>setCourts(r.data)); coachesAPI.getAll().then(r=>setCoaches(r.data)); equipmentAPI.getAll().then(r=>setEquipment(r.data)); },[]);

  const handleConfirm = async ()=>{
    const user = JSON.parse(localStorage.getItem("user")||"null");
    if(!user){ alert("Please login"); return; }
    try{
      const payload = {
        userEmail: user.email,
        courtId: selected.courtId,
        coachId: selected.coachId || null,
        equipments: selected.equipments,
        startTime: selected.startTime,
        endTime: selected.endTime
      };
      const res = await bookingsAPI.create(payload);
      alert("Booked id: "+res.data.booking.id);
    }catch(err){ alert(err.response?.data?.error || err.message); }
  };

  return (
    <div className=" p-8 pt-20">
      <h2 className="text-2xl font-semibold mb-4">Book a court</h2>
      <DateSelector selected={selected} setSelected={setSelected} />
      <TimeSlotGrid selected={selected} setSelected={setSelected} />
      <ResourceSelector selected={selected} setSelected={setSelected} courts={courts} coaches={coaches} equipment={equipment} />
      <PriceBreakdown selected={selected} courts={courts} coaches={coaches} equipment={equipment} />
      <div className="mt-4"><button onClick={handleConfirm} className="bg-indigo-600 text-white px-4 py-2 rounded">Confirm Booking</button></div>
    </div>
  );
}
