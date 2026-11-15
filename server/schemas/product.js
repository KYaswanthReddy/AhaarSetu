/**
 * AhaarSetu AI — Mongoose Schema: Product Master
 * server/schemas/product.js
 *
 * Master record for a micro food processor's product profile.
 * Each product holds its category, FSSAI details, pack sizes,
 * and category-specific compliance rule overrides.
 */

'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    // Owner reference
    owner_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Identity
    product_id_code: {
      type: String,
      required: true,
      unique: true,
      comment: 'Human-readable code, e.g. PROD-MNG-001',
    },
    product_name: { type: String, required: true },
    product_name_local: { type: String, default: '' },

    // Category
    category_code: {
      type: String,
      enum: [
        'pickles_and_chutneys',
        'spice_powders_masalas',
        'millet_snacks',
        'flour_mill_products',
        'papads',
        'cold_pressed_oils',
      ],
      required: true,
    },

    // FSSAI
    owner_fssai_number: {
      type: String,
      required: true,
      minlength: 14,
      maxlength: 14,
    },
    fssai_tier: {
      type: String,
      enum: ['basic', 'state', 'central'],
      required: true,
    },
    annual_turnover_inr: { type: Number, required: true, min: 0 },

    // Manufacturer
    unit_name: { type: String, required: true },
    address:   { type: String, required: true },
    district:  { type: String, required: true },
    state:     { type: String, required: true },
    pincode:   { type: String, default: '' },

    // Sales channels (determines tier requirements)
    sales_channels: {
      type: [String],
      enum: ['local', 'interstate', 'ecommerce', 'ondc', 'supermarket', 'shg'],
      default: ['local'],
    },

    // Pack sizes
    pack_sizes_grams: {
      type: [Number],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one pack size is required.',
      },
    },

    // Preferred language for voice + UI
    preferred_language: {
      type: String,
      enum: ['telugu', 'kannada', 'hindi', 'tamil', 'english'],
      default: 'telugu',
    },

    // Category-specific rule flags
    category_rule_flags: {
      // Pickles
      is_oil_based:         { type: Boolean, default: false },
      moisture_limit_pct:   { type: Number, default: null },
      // Flours
      is_fortified:         { type: Boolean, default: false },
      fortification_type:   { type: String, default: null },
      // Spice powders
      has_synthetic_colour: { type: Boolean, default: false },
      // Millets
      primary_millet_type:  { type: String, default: null },
      // Oils
      extraction_method:    {
        type: String,
        enum: ['cold_pressed', 'expeller_pressed', 'solvent_extracted', null],
        default: null,
      },
    },

    // Veg / Non-Veg
    veg_nonveg: {
      type: String,
      enum: ['veg', 'non-veg'],
      required: true,
      default: 'veg',
    },

    is_active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    collection: 'products',
  }
);

ProductSchema.index({ owner_id: 1 });
ProductSchema.index({ category_code: 1 });
ProductSchema.index({ owner_fssai_number: 1 });

module.exports = mongoose.model('Product', ProductSchema);
