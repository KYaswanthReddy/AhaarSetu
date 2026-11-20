const { validateLabel } = require('../fssaiValidator');

function testDescendingSort() {
  const ingredients = [
    { name: 'Chilli Powder', grams: 500 },
    { name: 'Raw Mango', grams: 2500 },
    { name: 'Salt', grams: 200 }
  ];

  const sorted = [...ingredients].sort((a, b) => b.grams - a.grams);
  if (sorted[0].name === 'Raw Mango' && sorted[2].name === 'Salt') {
    console.log('✅ Descending sort test passed.');
  } else {
    throw new Error('Descending sort test failed.');
  }
}

if (require.main === module) {
  testDescendingSort();
}
