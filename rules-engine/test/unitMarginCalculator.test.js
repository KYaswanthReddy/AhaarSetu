const { calculateUnitMargin } = require('../unitMarginCalculator');

function runTest() {
  const result = calculateUnitMargin({
    rawMaterialCost: 500,
    packagingCost: 100,
    fuelCost: 50,
    labourCost: 150,
    labFeeAmortized: 20,
    totalPacksProduced: 20,
    targetMrp: 60,
    retailerMarginPct: 15
  });

  console.log('Unit Margin Test Result:', result);
  if (result.costPerPack > 0) {
    console.log('✅ Unit margin calculation test passed.');
  } else {
    throw new Error('Test failed.');
  }
}

if (require.main === module) {
  runTest();
}
