/**
 * AhaarSetu AI — Deterministic FSSAI & Legal Metrology Validator
 * rules-engine/fssaiValidator.js
 *
 * This module enforces hard-coded regulatory rules derived from:
 *   - FSSAI Food Safety and Standards (Labelling & Display) Regulations
 *   - Legal Metrology (Packaged Commodities) Rules
 *
 * It is DETERMINISTIC — no AI/LLM decisions are made here.
 * All regulatory checks produce pass/fail with an explicit reason string.
 *
 * Human owner sign-off is ALWAYS required before any label is printed.
 */

'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — ALLERGEN DETECTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Canonical allergen keyword map.
 * Key  = standard allergen name (displayed to owner)
 * Value = array of ingredient name substrings to match (lowercase)
 */
const ALLERGEN_KEYWORDS = {
  mustard:   ['mustard', 'sarson', 'rai', 'kadugu'],
  sesame:    ['sesame', 'til', 'gingelly', 'ellu'],
  groundnut: ['groundnut', 'peanut', 'moongphali', 'verkadalai'],
  gluten:    ['wheat', 'atta', 'maida', 'semolina', 'rava', 'barley', 'rye', 'oat'],
  milk:      ['milk', 'dairy', 'cream', 'butter', 'ghee', 'paneer', 'curd', 'whey', 'lactose'],
  treenuts:  ['cashew', 'kaju', 'almond', 'badam', 'walnut', 'pistachio', 'pista'],
  soy:       ['soy', 'soya', 'tofu', 'edamame'],
  sulphites: ['sulphite', 'sulfite', 'ins 220', 'ins 221', 'ins 222', 'ins 223', 'ins 224', 'ins 225'],
};

/**
 * detectAllergens
 * @param {Array<{name: string}>} ingredients
 * @returns {{ allergens: string[], flaggedIngredients: Array<{ingredient: string, allergen: string}> }}
 */
function detectAllergens(ingredients) {
  const found = [];
  const flagged = [];

  for (const ing of ingredients) {
    const nameLower = (ing.name || '').toLowerCase();
    for (const [allergen, keywords] of Object.entries(ALLERGEN_KEYWORDS)) {
      if (keywords.some((kw) => nameLower.includes(kw))) {
        if (!found.includes(allergen)) found.push(allergen);
        flagged.push({ ingredient: ing.name, allergen });
      }
    }
  }

  return { allergens: found, flaggedIngredients: flagged };
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — DESCENDING INGREDIENT WEIGHT SORT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * sortIngredientsByWeight
 * FSSAI Labelling Regulation: ingredients must be listed in descending order
 * of their weight at the time of manufacture.
 *
 * @param {Array<{name: string, weight_grams: number}>} ingredients
 * @returns {Array<{name: string, weight_grams: number}>} sorted descending
 */
function sortIngredientsByWeight(ingredients) {
  if (!Array.isArray(ingredients)) {
    throw new Error('ingredients must be an array');
  }
  return [...ingredients].sort((a, b) => b.weight_grams - a.weight_grams);
}

/**
 * validateIngredientOrder
 * Checks whether the provided list is already in descending weight order.
 *
 * @param {Array<{name: string, weight_grams: number}>} ingredients
 * @returns {{ valid: boolean, reason: string }}
 */
function validateIngredientOrder(ingredients) {
  for (let i = 1; i < ingredients.length; i++) {
    if (ingredients[i].weight_grams > ingredients[i - 1].weight_grams) {
      return {
        valid: false,
        reason: `Ingredient order violation: "${ingredients[i].name}" (${ingredients[i].weight_grams}g) appears after "${ingredients[i - 1].name}" (${ingredients[i - 1].weight_grams}g) but weighs more. FSSAI requires descending weight order.`,
      };
    }
  }
  return { valid: true, reason: 'Ingredient list is in correct descending weight order.' };
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — LEGAL METROLOGY FONT SCALING BY PACK SIZE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Legal Metrology (Packaged Commodities) Rules — minimum font height (mm)
 * based on Principal Display Panel (PDP) area.
 *
 * PDP area is estimated from the pack size (net weight) using
 * approximate container surface area ranges observed in field testing.
 *
 * Pack size thresholds and PDP area mapping (approximate):
 *   ≤ 50g   → PDP area ~ < 100 cm²  → min 1 mm
 *   51–200g → PDP area ~ 100–200 cm² → min 2 mm
 *   201–500g→ PDP area ~ 200–500 cm² → min 4 mm
 *   > 500g  → PDP area ~ > 500 cm²   → min 6 mm
 */
const FONT_SCALING_RULES = [
  { maxGrams: 50,   pdpRange: '< 100 cm²',    minFontMm: 1 },
  { maxGrams: 200,  pdpRange: '100–200 cm²',   minFontMm: 2 },
  { maxGrams: 500,  pdpRange: '200–500 cm²',   minFontMm: 4 },
  { maxGrams: Infinity, pdpRange: '> 500 cm²', minFontMm: 6 },
];

/**
 * getFontRequirement
 * @param {number} packSizeGrams  Net weight of the pack in grams.
 * @returns {{ packSizeGrams: number, pdpRange: string, minFontMm: number, description: string }}
 */
function getFontRequirement(packSizeGrams) {
  const rule = FONT_SCALING_RULES.find((r) => packSizeGrams <= r.maxGrams);
  return {
    packSizeGrams,
    pdpRange: rule.pdpRange,
    minFontMm: rule.minFontMm,
    description: `Pack ${packSizeGrams}g → PDP area ${rule.pdpRange} → minimum font height ${rule.minFontMm} mm (Legal Metrology Rule 6).`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — MANDATORY LABEL FIELD VALIDATION
// ─────────────────────────────────────────────────────────────────────────────

const MANDATORY_FIELDS = [
  'product_name',
  'net_quantity_metric',
  'ingredient_list_descending_weight',
  'nutritional_info_per_100g',
  'allergen_declaration',
  'fssai_license_number',
  'manufacturer_name_address',
  'best_before_date',
  'mrp_inclusive_all_taxes',
  'veg_nonveg_symbol',
  'batch_lot_number',
  'country_of_origin',
];

/**
 * validateMandatoryFields
 * @param {Object} label  Key-value map of label fields.
 * @returns {{ valid: boolean, missingFields: string[], reason: string }}
 */
function validateMandatoryFields(label) {
  const missing = MANDATORY_FIELDS.filter(
    (f) => label[f] === undefined || label[f] === null || label[f] === ''
  );

  if (missing.length > 0) {
    return {
      valid: false,
      missingFields: missing,
      reason: `Missing ${missing.length} mandatory label field(s): ${missing.join(', ')}.`,
    };
  }

  return { valid: true, missingFields: [], reason: 'All mandatory label fields present.' };
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5 — FSSAI REGISTRATION TIER CHECK
// ─────────────────────────────────────────────────────────────────────────────

const FSSAI_TIERS = {
  basic:   { maxInr: 1_200_000,    suffix: 'R', label: 'Basic Registration' },
  state:   { maxInr: 200_000_000,  suffix: 'L', label: 'State License' },
  central: { maxInr: Infinity,     suffix: 'L', label: 'Central License' },
};

/**
 * checkRegistrationTier
 * @param {number} annualTurnoverInr
 * @param {string} declaredTier  'basic' | 'state' | 'central'
 * @param {string[]} salesChannels  e.g. ['local', 'ecommerce', 'interstate']
 * @returns {{ valid: boolean, recommendedTier: string, reason: string }}
 */
function checkRegistrationTier(annualTurnoverInr, declaredTier, salesChannels = []) {
  let recommended = 'basic';
  if (annualTurnoverInr > FSSAI_TIERS.state.maxInr) recommended = 'central';
  else if (annualTurnoverInr > FSSAI_TIERS.basic.maxInr) recommended = 'state';

  // E-commerce and inter-state sales always require at least State License
  const needsState = salesChannels.some((ch) =>
    ['ecommerce', 'interstate', 'ondc', 'amazon', 'flipkart'].includes(ch.toLowerCase())
  );
  if (needsState && recommended === 'basic') recommended = 'state';

  const valid = declaredTier === recommended ||
    (recommended === 'basic' && declaredTier === 'state') ||
    (recommended === 'state' && declaredTier === 'central');

  const reason = valid
    ? `Declared tier (${declaredTier}) is appropriate for turnover ₹${annualTurnoverInr.toLocaleString('en-IN')} and channels [${salesChannels.join(', ')}].`
    : `Tier mismatch: declared "${declaredTier}" but recommended "${recommended}" for turnover ₹${annualTurnoverInr.toLocaleString('en-IN')} and channels [${salesChannels.join(', ')}]. Owner should contact FSSAI / FoSCoS to upgrade registration.`;

  return { valid, recommendedTier: recommended, reason };
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 6 — COMPOSITE LABEL VALIDATION (main export)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * validateLabel
 * Runs all deterministic checks and returns a composite compliance report.
 *
 * @param {Object} params
 * @param {Object}   params.label              Label field map (see MANDATORY_FIELDS).
 * @param {Array}    params.ingredients         Array of { name, weight_grams }.
 * @param {number}   params.packSizeGrams       Net weight of this pack.
 * @param {number}   params.annualTurnoverInr   Owner's declared annual turnover.
 * @param {string}   params.declaredTier        'basic' | 'state' | 'central'.
 * @param {string[]} params.salesChannels       e.g. ['local', 'ecommerce'].
 *
 * @returns {Object} Composite compliance report with overall pass/fail and per-check details.
 */
function validateLabel({
  label = {},
  ingredients = [],
  packSizeGrams = 250,
  annualTurnoverInr = 0,
  declaredTier = 'basic',
  salesChannels = [],
}) {
  // 1. Mandatory fields
  const fields = validateMandatoryFields(label);

  // 2. Ingredient sort order
  const sortCheck = validateIngredientOrder(ingredients);

  // 3. Allergen detection
  const allergenCheck = detectAllergens(ingredients);
  const allergenDeclared = (label.allergen_declaration || '').toLowerCase();
  const undeclaredAllergens = allergenCheck.allergens.filter(
    (a) => !allergenDeclared.includes(a)
  );

  // 4. Font requirement
  const fontReq = getFontRequirement(packSizeGrams);

  // 5. Registration tier
  const tierCheck = checkRegistrationTier(annualTurnoverInr, declaredTier, salesChannels);

  // Compute overall compliance score (0–100)
  let score = 100;
  if (!fields.valid) score -= 30;
  if (!sortCheck.valid) score -= 20;
  if (undeclaredAllergens.length > 0) score -= 25;
  if (!tierCheck.valid) score -= 25;

  const overallValid = fields.valid && sortCheck.valid && undeclaredAllergens.length === 0;

  return {
    overallValid,
    complianceScore: Math.max(0, score),
    checks: {
      mandatoryFields: fields,
      ingredientOrder: sortCheck,
      allergens: {
        detected: allergenCheck.allergens,
        flaggedIngredients: allergenCheck.flaggedIngredients,
        undeclaredInLabel: undeclaredAllergens,
        valid: undeclaredAllergens.length === 0,
        reason: undeclaredAllergens.length === 0
          ? 'All detected allergens are declared on the label.'
          : `Undeclared allergens found: ${undeclaredAllergens.join(', ')}. These MUST appear in the allergen statement.`,
      },
      fontRequirement: fontReq,
      registrationTier: tierCheck,
    },
    humanSignOffRequired: true,
    humanSignOffNote:
      'AhaarSetu AI operates on the support side of compliance only. The business owner MUST review and approve this label before printing. Food safety certification and shelf-life validation remain with FSSAI and NABL-accredited labs.',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  validateLabel,
  detectAllergens,
  sortIngredientsByWeight,
  validateIngredientOrder,
  getFontRequirement,
  validateMandatoryFields,
  checkRegistrationTier,
  ALLERGEN_KEYWORDS,
  MANDATORY_FIELDS,
  FONT_SCALING_RULES,
  FSSAI_TIERS,
};
