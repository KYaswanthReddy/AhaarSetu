import Dexie from 'dexie';

export const db = new Dexie('AhaarSetuDB');

db.version(1).stores({
  products: '++id, name, category, fssaiNumber, createdAt',
  batches: '++id, batchId, productId, date, syncStatus, ownerApproved',
  ingredients: '++id, name, localUnit, metricGrams, allergenFlag',
  syncQueue: '++id, endpoint, payload, retryCount, createdAt'
});
