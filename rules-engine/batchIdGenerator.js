/**
 * AhaarSetu Batch ID Generator
 * Format: <PRODUCT_CODE>-<YYYYMMDD>-<B{nn}>
 * Example: MNG-20261119-B01
 */

const PRODUCT_CODES = {
  "mango pickle": "MNG",
  "chilli pickle": "CHL",
  "spice powder": "SPW",
  "masala": "MSL",
  "ragi snack": "RGI",
  "wheat flour": "WFR",
  "papad": "PPD",
  "cold pressed oil": "CPO",
  "millet snack": "MLT",
};

function generateBatchId(productName, date = new Date(), sequence = 1) {
  const code = PRODUCT_CODES[productName.toLowerCase()] || "GEN";
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const seq = String(sequence).padStart(2, "0");
  return `${code}-${dateStr}-B${seq}`;
}

module.exports = { generateBatchId, PRODUCT_CODES };
