/**
 * AhaarSetu AI — True Unit Margin Calculator
 * rules-engine/unitMarginCalculator.js
 *
 * Deterministic calculation of true landed cost per pack and retail margin.
 * Exposes hidden costs (packaging, LPG, labour, lab fee) that micro-units
 * typically ignore when pricing products.
 *
 * Human owner sign-off is required before any selling price is confirmed.
 */

'use strict';

/**
 * calculateUnitMargin
 *
 * @param {Object} params
 * @param {number} params.rawMaterialCostTotal     Total raw material cost for the batch (₹).
 * @param {number} params.packagingCostPerPack     Cost of one jar/pouch/bag (₹).
 * @param {number} params.lpgFuelCostBatch         Total LPG/fuel cost for the batch (₹).
 * @param {number} params.labourCostBatch          Total labour cost for the batch (₹).
 * @param {number} params.nablLabTestCost          NABL lab test fee amortised over expected batches (₹ total).
 * @param {number} params.nablAmortisedBatches     Number of batches over which lab fee is spread (default 10).
 * @param {number} params.spoilagePercent          Expected spoilage/wastage percentage (e.g. 5 = 5%).
 * @param {number} params.quantityPacked           Number of packs produced in this batch.
 * @param {number} params.targetMrpPerPack         Owner's target MRP per pack (₹).
 * @param {number} params.retailChannelMarginPct   Retailer/distributor margin percentage (e.g. 20 = 20%).
 *
 * @returns {Object} Full cost breakdown and margin analysis.
 */
function calculateUnitMargin({
  rawMaterialCostTotal = 0,
  packagingCostPerPack = 0,
  lpgFuelCostBatch = 0,
  labourCostBatch = 0,
  nablLabTestCost = 0,
  nablAmortisedBatches = 10,
  spoilagePercent = 5,
  quantityPacked = 1,
  targetMrpPerPack = 0,
  retailChannelMarginPct = 20,
}) {
  if (quantityPacked <= 0) throw new Error('quantityPacked must be greater than 0');

  // Per-pack raw material cost
  const rawMaterialPerPack = rawMaterialCostTotal / quantityPacked;

  // Spoilage uplift — applied to raw material cost
  const spoilageUpliftPerPack = rawMaterialPerPack * (spoilagePercent / 100);

  // Per-pack overheads
  const lpgPerPack    = lpgFuelCostBatch / quantityPacked;
  const labourPerPack = labourCostBatch / quantityPacked;
  const nablPerPack   = nablLabTestCost / (nablAmortisedBatches * quantityPacked);

  // True landed cost per pack
  const landedCostPerPack =
    rawMaterialPerPack +
    spoilageUpliftPerPack +
    packagingCostPerPack +
    lpgPerPack +
    labourPerPack +
    nablPerPack;

  // Minimum viable MRP to break even at given retail margin
  // landedCost = mrp × (1 - retailMargin%)
  // ∴ mrp_breakeven = landedCost / (1 - retailMargin%)
  const breakEvenMrp = landedCostPerPack / (1 - retailChannelMarginPct / 100);

  // Actual margin at target MRP
  // margin = (mrp - landedCost) / mrp × 100
  const marginAtTargetMrp =
    targetMrpPerPack > 0
      ? ((targetMrpPerPack - landedCostPerPack) / targetMrpPerPack) * 100
      : -Infinity;

  const isProfitable        = targetMrpPerPack > breakEvenMrp;
  const isBelowLandedCost   = targetMrpPerPack < landedCostPerPack;

  // Human-readable alert
  let alert = null;
  if (isBelowLandedCost) {
    alert = `⚠️  LOSS ALERT: Target MRP ₹${targetMrpPerPack.toFixed(2)} is BELOW the true landed cost ₹${landedCostPerPack.toFixed(2)} per pack. You will lose ₹${(landedCostPerPack - targetMrpPerPack).toFixed(2)} on every pack sold. Do not confirm this price without owner sign-off.`;
  } else if (!isProfitable) {
    alert = `⚠️  MARGIN ALERT: Target MRP ₹${targetMrpPerPack.toFixed(2)} covers costs but leaves less than the ${retailChannelMarginPct}% retail channel margin. Break-even MRP is ₹${breakEvenMrp.toFixed(2)}.`;
  }

  return {
    perPackBreakdown: {
      rawMaterial:    +rawMaterialPerPack.toFixed(2),
      spoilageUplift: +spoilageUpliftPerPack.toFixed(2),
      packaging:      +packagingCostPerPack.toFixed(2),
      lpgFuel:        +lpgPerPack.toFixed(2),
      labour:         +labourPerPack.toFixed(2),
      nablAmortised:  +nablPerPack.toFixed(2),
    },
    landedCostPerPack:        +landedCostPerPack.toFixed(2),
    breakEvenMrp:             +breakEvenMrp.toFixed(2),
    targetMrpPerPack:         +targetMrpPerPack.toFixed(2),
    marginAtTargetMrpPercent: +marginAtTargetMrp.toFixed(2),
    retailChannelMarginPct,
    isProfitable,
    isBelowLandedCost,
    alert,
    humanSignOffRequired: true,
    humanSignOffNote:
      'The owner MUST review and confirm the selling price before any label or invoice is generated. AhaarSetu AI provides cost analysis only — pricing decisions remain with the business owner.',
  };
}

module.exports = { calculateUnitMargin };
