/**
 * Legal Metrology (Packaged Commodities) Rules 2011 - Font Height Regulations
 */

function getMinimumFontHeightMm(packWeightGrams) {
  if (packWeightGrams <= 50) return 1.0;
  if (packWeightGrams <= 200) return 2.0;
  if (packWeightGrams <= 1000) return 4.0;
  return 6.0;
}

function validatePdpFontSizes(packWeightGrams, declaredFontHeightMm) {
  const minRequired = getMinimumFontHeightMm(packWeightGrams);
  return {
    compliant: declaredFontHeightMm >= minRequired,
    minimumRequiredMm: minRequired,
    declaredMm: declaredFontHeightMm
  };
}

module.exports = { getMinimumFontHeightMm, validatePdpFontSizes };
