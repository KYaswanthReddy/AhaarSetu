const { determineFssaiTier } = require('../turnoverTierChecker');

function runTests() {
  // Test 1: Petty manufacturer < 12L
  const t1 = determineFssaiTier(8, false, false);
  if (t1.recommendedTier !== 'Basic_Registration') {
    throw new Error('Test 1 failed: expected Basic_Registration');
  }

  // Test 2: > 12L intra-state
  const t2 = determineFssaiTier(25, false, false);
  if (t2.recommendedTier !== 'State_License') {
    throw new Error('Test 2 failed: expected State_License');
  }

  // Test 3: < 12L but online/ecommerce sale
  const t3 = determineFssaiTier(6, false, true);
  if (t3.recommendedTier !== 'State_License' || !t3.upgradeRequired) {
    throw new Error('Test 3 failed: e-commerce should mandate State_License');
  }

  console.log('✅ All 3 FSSAI turnover tier tests passed successfully.');
}

if (require.main === module) {
  runTests();
}
