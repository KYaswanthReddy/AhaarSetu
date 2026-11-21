/**
 * FSSAI Registration vs License Threshold Validator
 * Based on Food Safety and Standards (Licensing and Registration) Regulations
 */

const FSSAI_THRESHOLDS = {
  BASIC_REGISTRATION_MAX_LAKHS: 12, // Up to 12 Lakhs per annum
  STATE_LICENSE_MAX_CRORES: 20      // 12 Lakhs to 20 Crores per annum
};

function determineFssaiTier(annualTurnoverLakhs, interStateSales = false, ecommerceSales = false) {
  // E-commerce or Inter-state mandatorily requires State or Central license
  if (interStateSales || ecommerceSales) {
    if (annualTurnoverLakhs > (FSSAI_THRESHOLDS.STATE_LICENSE_MAX_CRORES * 100)) {
      return {
        recommendedTier: 'Central_License',
        upgradeRequired: true,
        reason: 'Turnover exceeds ₹20 Crore limit'
      };
    }
    return {
      recommendedTier: 'State_License',
      upgradeRequired: true,
      reason: 'Inter-state or online sales require minimum State License under FSSAI regulations'
    };
  }

  if (annualTurnoverLakhs <= FSSAI_THRESHOLDS.BASIC_REGISTRATION_MAX_LAKHS) {
    return {
      recommendedTier: 'Basic_Registration',
      upgradeRequired: false,
      reason: 'Annual turnover is within ₹12 Lakh threshold for local petty food manufacturer registration'
    };
  }

  if (annualTurnoverLakhs <= (FSSAI_THRESHOLDS.STATE_LICENSE_MAX_CRORES * 100)) {
    return {
      recommendedTier: 'State_License',
      upgradeRequired: true,
      reason: 'Annual turnover exceeds ₹12 Lakhs, requiring State License'
    };
  }

  return {
    recommendedTier: 'Central_License',
    upgradeRequired: true,
    reason: 'Annual turnover exceeds ₹20 Crores, requiring Central License'
  };
}

module.exports = { determineFssaiTier, FSSAI_THRESHOLDS };
