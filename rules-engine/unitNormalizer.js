// AhaarSetu Unit Normalizer
// Converts local Indian kitchen units to metric grams

const UNIT_MAP = {
  pavu: 250,
  "pav": 250,
  seer: 933,
  "ser": 933,
  tin: 15000,
  "litre": 1000,
  "liter": 1000,
  "l": 1000,
  "ml": 1,
  "kg": 1000,
  "g": 1,
  "gram": 1,
  "grams": 1,
  "kilo": 1000,
};

function normalizeToGrams(quantity, unit) {
  const key = unit.toLowerCase().trim();
  const factor = UNIT_MAP[key];
  if (!factor) throw new Error(`Unknown unit: ${unit}`);
  return quantity * factor;
}

module.exports = { normalizeToGrams, UNIT_MAP };
