/**
 * AhaarSetu AI — Mongoose Schema: Batch Passport
 * server/schemas/batchPassport.js
 *
 * Stores every production batch record with full ingredient lineage,
 * unit cost breakdown, compliance flags, and owner sign-off.
 */

'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// ─── Sub-schemas ─────────────────────────────────────────────────────────────

const IngredientSchema = new Schema(
  {
    name:          { type: String, required: true },
    name_local:    { type: String, default: '' },
    weight_grams:  { type: Number, required: true, min: 0 },
    is_allergen:   { type: Boolean, default: false },
    allergen_type: { type: String, default: null },
    ins_code:      { type: String, default: null },
    purchase_date: { type: Date,   required: true },
    supplier_name: { type: String, default: '' },
    lot_reference: { type: String, default: '' },
  },
  { _id: false }
);

const NutritionSchema = new Schema(
  {
    energy_kcal:        { type: Number, default: 0 },
    protein_g:          { type: Number, default: 0 },
    carbohydrates_g:    { type: Number, default: 0 },
    total_fat_g:        { type: Number, default: 0 },
    saturated_fat_g:    { type: Number, default: 0 },
    trans_fat_g:        { type: Number, default: 0 },
    dietary_fibre_g:    { type: Number, default: 0 },
    sodium_mg:          { type: Number, default: 0 },
  },
  { _id: false }
);

const CostBreakdownSchema = new Schema(
  {
    raw_material_inr:        { type: Number, required: true, min: 0 },
    packaging_inr:           { type: Number, required: true, min: 0 },
    lpg_fuel_inr:            { type: Number, required: true, min: 0 },
    labour_inr:              { type: Number, required: true, min: 0 },
    nabl_amortised_inr:      { type: Number, default: 0, min: 0 },
    spoilage_uplift_inr:     { type: Number, default: 0, min: 0 },
    total_landed_cost_inr:   { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OwnerSignOffSchema = new Schema(
  {
    signed:         { type: Boolean, required: true, default: false },
    timestamp:      { type: Date,   default: null },
    owner_name:     { type: String, default: '' },
    voice_confirmed:{ type: Boolean, default: false },
  },
  { _id: false }
);

const ComplianceSchema = new Schema(
  {
    compliance_score:        { type: Number, min: 0, max: 100, default: 0 },
    overall_valid:           { type: Boolean, default: false },
    missing_fields:          [{ type: String }],
    allergens_detected:      [{ type: String }],
    allergens_undeclared:    [{ type: String }],
    ingredient_order_valid:  { type: Boolean, default: false },
    font_min_mm:             { type: Number, default: 1 },
    tier_check_valid:        { type: Boolean, default: false },
    tier_recommended:        { type: String, enum: ['basic', 'state', 'central'], default: 'basic' },
  },
  { _id: false }
);

// ─── Main Batch Passport Schema ───────────────────────────────────────────────

const BatchPassportSchema = new Schema(
  {
    // Identification
    batch_id: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Z]{2,6}-\d{8}-B\d{2}$/,
      comment: 'Format: CATEGORYCODE-YYYYMMDD-B##  e.g. MNG-20261115-B01',
    },
    product_id:   { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    owner_id:     { type: Schema.Types.ObjectId, ref: 'User',    required: true },

    // Manufacturer
    unit_name:          { type: String, required: true },
    district:           { type: String, required: true },
    state:              { type: String, required: true },
    fssai_number:       { type: String, required: true, minlength: 14, maxlength: 14 },
    fssai_tier:         { type: String, enum: ['basic', 'state', 'central'], required: true },

    // Product
    product_name:       { type: String, required: true },
    category_code:      {
      type: String,
      enum: ['pickles_and_chutneys', 'spice_powders_masalas', 'millet_snacks',
             'flour_mill_products', 'papads', 'cold_pressed_oils'],
      required: true,
    },
    pack_size_grams:    { type: Number, required: true, min: 1 },
    quantity_packed:    { type: Number, required: true, min: 1 },
    manufacture_date:   { type: Date,   required: true },
    best_before_date:   { type: Date,   required: true },
    mrp_per_pack_inr:   { type: Number, required: true, min: 0 },

    // Ingredients (descending weight order enforced by fssaiValidator.js)
    ingredients:        { type: [IngredientSchema], required: true },
    veg_nonveg:         { type: String, enum: ['veg', 'non-veg'], required: true },

    // Nutrition
    nutrition_per_100g: { type: NutritionSchema, default: () => ({}) },

    // Cost
    cost_breakdown:     { type: CostBreakdownSchema, required: true },
    break_even_mrp_inr: { type: Number, required: true },
    retail_margin_pct:  { type: Number, required: true },
    is_profitable:      { type: Boolean, default: false },

    // Compliance
    compliance:         { type: ComplianceSchema, default: () => ({}) },

    // NABL Lab
    nabl_test_status: {
      type: String,
      enum: ['not_submitted', 'submitted', 'report_received', 'exempted_basic_tier'],
      default: 'not_submitted',
    },
    nabl_report_url:    { type: String, default: null },
    nabl_referral_sent: { type: Boolean, default: false },

    // Owner Sign-Off (mandatory before label print)
    owner_sign_off:     { type: OwnerSignOffSchema, required: true, default: () => ({}) },

    // Outputs
    qr_verification_url:{ type: String, default: null },
    label_pdf_url:      { type: String, default: null },
    buyer_dossier_url:  { type: String, default: null },

    // Sync
    sync_status: {
      type: String,
      enum: ['local_only', 'synced'],
      default: 'local_only',
    },
  },
  {
    timestamps: true,
    collection: 'batch_passports',
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────

BatchPassportSchema.index({ owner_id: 1, manufacture_date: -1 });
BatchPassportSchema.index({ product_id: 1 });
BatchPassportSchema.index({ fssai_number: 1 });
BatchPassportSchema.index({ sync_status: 1 });

// ─── Pre-save hook: enforce owner sign-off before marking label as generated ──

BatchPassportSchema.pre('save', function (next) {
  if (this.label_pdf_url && (!this.owner_sign_off || !this.owner_sign_off.signed)) {
    return next(
      new Error(
        'Label PDF cannot be set without owner sign-off. Human-in-the-loop approval is mandatory.'
      )
    );
  }
  next();
});

module.exports = mongoose.model('BatchPassport', BatchPassportSchema);
