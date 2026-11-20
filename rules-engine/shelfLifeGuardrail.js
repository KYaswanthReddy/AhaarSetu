/**
 * Category-based shelf life validation & NABL lab guardrails
 */
const DEFAULT_SAFE_PERIODS = {
  pickles: { maxDaysWithoutLab: 90, moistureLimitPct: 25 },
  spice_powders: { maxDaysWithoutLab: 180, moistureLimitPct: 10 },
  millet_snacks: { maxDaysWithoutLab: 45, moistureLimitPct: 5 },
  flour_mill: { maxDaysWithoutLab: 60, moistureLimitPct: 14 }
};

function validateShelfLife(category, requestedDays, labReportUrl) {
  const rule = DEFAULT_SAFE_PERIODS[category] || { maxDaysWithoutLab: 30 };

  if (requestedDays > rule.maxDaysWithoutLab && !labReportUrl) {
    return {
      allowed: false,
      reason: `Shelf life of ${requestedDays} days exceeds category limit (${rule.maxDaysWithoutLab} days). NABL accredited lab report URL required.`
    };
  }

  return { allowed: true, safePeriodDays: Math.min(requestedDays, rule.maxDaysWithoutLab) };
}

module.exports = { validateShelfLife, DEFAULT_SAFE_PERIODS };
