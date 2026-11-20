/**
 * Approximate macro-nutrients per 100g based on ICMR-NIN IFCT standards
 */
const IFCT_DATA = {
  "raw mango": { energy: 60, protein: 0.8, fat: 0.4, carbs: 14.0 },
  "gingelly oil": { energy: 884, protein: 0.0, fat: 100.0, carbs: 0.0 },
  "mustard oil": { energy: 884, protein: 0.0, fat: 100.0, carbs: 0.0 },
  "chilli powder": { energy: 282, protein: 13.4, fat: 14.3, carbs: 31.6 },
  "turmeric powder": { energy: 349, protein: 7.8, fat: 9.9, carbs: 64.9 },
  "salt": { energy: 0, protein: 0.0, fat: 0.0, carbs: 0.0 },
  "fenugreek": { energy: 323, protein: 23.0, fat: 6.4, carbs: 58.3 },
  "ragi flour": { energy: 328, protein: 7.3, fat: 1.3, carbs: 72.0 },
  "wheat atta": { energy: 341, protein: 12.1, fat: 1.7, carbs: 69.4 }
};

function calculateNutritionPer100g(ingredients) {
  let totalWeight = 0;
  let totalEnergy = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;

  for (const item of ingredients) {
    const key = item.name.toLowerCase().trim();
    const grams = Number(item.grams) || 0;
    totalWeight += grams;

    const ref = IFCT_DATA[key] || { energy: 50, protein: 1.0, fat: 0.5, carbs: 10.0 };
    totalEnergy += (ref.energy * grams) / 100;
    totalProtein += (ref.protein * grams) / 100;
    totalFat += (ref.fat * grams) / 100;
    totalCarbs += (ref.carbs * grams) / 100;
  }

  if (totalWeight === 0) return { energy: 0, protein: 0, fat: 0, carbs: 0 };

  const factor = 100 / totalWeight;
  return {
    energyKcal: Math.round(totalEnergy * factor),
    proteinG: Number((totalProtein * factor).toFixed(2)),
    fatG: Number((totalFat * factor).toFixed(2)),
    carbsG: Number((totalCarbs * factor).toFixed(2))
  };
}

module.exports = { calculateNutritionPer100g, IFCT_DATA };
