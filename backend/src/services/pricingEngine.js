// services/PricingEngine.js
module.exports = function calculatePrice({ 
  court, 
  coach, 
  equipments, 
  pricingRules, 
  start, 
  end 
}) {

  let total = 0;
  const breakdown = {
    courtBase: 0,
    rules: [],
    equipment: [],
    coach: coach ? coach.price : 0
  };

  const durationHours = (end - start) / (1000 * 60 * 60);

  // Base court price
  breakdown.courtBase = court.basePrice * durationHours;
  total += breakdown.courtBase;

  // Apply pricing rules
  pricingRules.forEach(rule => {
    if (rule.type === "peak") {
      if (start.getHours() >= rule.startHour && end.getHours() <= rule.endHour) {
        total *= rule.multiplier;
        breakdown.rules.push({ type: "peak", multiplier: rule.multiplier });
      }
    }

    if (rule.type === "weekend") {
      const day = start.getDay();
      if (rule.daysOfWeek.includes(day)) {
        total += rule.surcharge;
        breakdown.rules.push({ type: "weekend", surcharge: rule.surcharge });
      }
    }

    if (rule.type === "court_type") {
      if (rule.courtType === court.type) {
        total *= rule.multiplier;
        breakdown.rules.push({
          type: "court_type",
          multiplier: rule.multiplier
        });
      }
    }
  });

  // Equipment cost
  equipments.forEach(item => {
    const eqPrice = item.equipment.price * item.quantity;
    total += eqPrice;
    breakdown.equipment.push({
      name: item.equipment.name,
      quantity: item.quantity,
      price: eqPrice
    });
  });

  // Coach fee
  if (coach) total += coach.price;

  return { total, breakdown };
};
