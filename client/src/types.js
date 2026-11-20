/**
 * @typedef {Object} Ingredient
 * @property {string} name
 * @property {number} grams
 * @property {number} [percentage]
 * @property {boolean} [isAllergen]
 * @property {string} [purchaseDate]
 */

/**
 * @typedef {Object} BatchRecord
 * @property {string} batchId
 * @property {string} productName
 * @property {string} category
 * @property {Ingredient[]} ingredients
 * @property {number} packSizeGrams
 * @property {number} totalPacks
 * @property {number} costPerPack
 * @property {number} mrp
 * @property {boolean} ownerApproved
 * @property {string} [qrUrl]
 */

export const BATCH_STATUS = {
  DRAFT: 'draft',
  APPROVED: 'approved',
  SYNCED: 'synced'
};
