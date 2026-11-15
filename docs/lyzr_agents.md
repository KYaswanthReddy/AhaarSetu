# AhaarSetu AI — Lyzr AI Multi-Agent Architecture

**Powered by Lyzr AI Multi-Agent Framework**

**Tech4Bharat – GAVS Hackathon 2026 | Problem Statement 6.3**

---

## Overview

AhaarSetu orchestrates **four bounded AI agents** in a sequential pipeline. Each agent has a strictly scoped role, defined inputs, defined outputs, and explicit guardrails that prevent hallucination of regulatory text. All agent outputs are **validated by the deterministic rule engine** (`fssaiValidator.js`, `unitMarginCalculator.js`) before being shown to the owner.

```
OWNER VOICE / FORM INPUT
        │
        ▼
┌───────────────────────────────────────────────────────────────┐
│  AGENT 1: Vernacular Intake Agent                             │
│  Transcribes speech → structured ingredient + batch data      │
└──────────────────────────┬────────────────────────────────────┘
                           │
                           ▼
┌───────────────────────────────────────────────────────────────┐
│  AGENT 2: FSSAI & Legal Metrology Compliance Agent            │
│  Validates label fields, allergens, tier, font rules          │
│  (backed by deterministic fssaiValidator.js — no hallucination)│
└──────────────────────────┬────────────────────────────────────┘
                           │
                           ▼
┌───────────────────────────────────────────────────────────────┐
│  AGENT 3: Unit Economics & Pricing Agent                      │
│  Calculates true landed cost, break-even MRP, margin alert    │
│  (backed by deterministic unitMarginCalculator.js)            │
└──────────────────────────┬────────────────────────────────────┘
                           │
                           ▼
┌───────────────────────────────────────────────────────────────┐
│  AGENT 4: Batch Traceability & Lab-Guardrail Agent            │
│  Assigns lot code, enforces NABL shelf-life guardrail,        │
│  generates NABL Lab Referral Notice PDF                       │
└──────────────────────────┬────────────────────────────────────┘
                           │
                           ▼
              MANDATORY OWNER SIGN-OFF
              (Human-in-the-Loop Checkpoint)
```

---

## Agent 1 — Vernacular Intake Agent

| Property | Detail |
|---|---|
| **Role** | Speech-to-structured-data converter |
| **Language Support** | Telugu, Kannada, Hindi, Tamil (via Bhashini API fallback to Web Speech API) |
| **Input** | Raw vernacular speech transcript or typed text in regional script |
| **Output** | `{ ingredients: [{name, name_local, weight_grams}], pack_size_grams, quantity_packed, batch_date, local_unit_conversions: [{raw_input, metric_grams}] }` |

### Guardrails

- Must extract a numeric weight (grams) for every ingredient. If the owner says *"a handful of chilli"*, the agent asks a clarifying voice prompt: *"How many grams of chilli did you use?"*
- Local unit conversion table is **hard-coded** (not AI-generated): `1 pavu = 250g`, `1 seer = 933g`, `1 tin ≈ 15 kg`, `1 viss = 1600g`.
- The agent **never invents ingredients**. If it cannot parse a word, it flags it as `{ name: "[UNCLEAR]", weight_grams: null }` and prompts re-entry.

### Sample Input / Output

**Voice input (Telugu):** *"6 kilo pacha mamidikaya, 1.5 kilo nuvvula nune, 1 kilo mirapakaya podi, 250 gram pachadi lo pack chesaru"*

**Structured output:**
```json
{
  "ingredients": [
    { "name": "Raw Mango", "name_local": "pacha mamidikaya", "weight_grams": 6000 },
    { "name": "Gingelly Oil", "name_local": "nuvvula nune", "weight_grams": 1500 },
    { "name": "Chilli Powder", "name_local": "mirapakaya podi", "weight_grams": 1000 }
  ],
  "pack_size_grams": 250,
  "quantity_packed": null,
  "batch_date": "2026-11-15"
}
```

---

## Agent 2 — FSSAI & Legal Metrology Compliance Agent

| Property | Detail |
|---|---|
| **Role** | Label validator and compliance checker |
| **Input** | Structured ingredient list + product category + FSSAI number + annual turnover + sales channels + pack size |
| **Output** | `{ label_valid: bool, missing_fields: [], allergen_flags: [], compliance_score: 0–100, font_requirement: {min_mm}, tier_check: {valid, recommended} }` |

### Guardrails

- **All decisions are backed by `fssaiValidator.js`** — the LLM interprets the results but never generates regulatory text from scratch.
- The agent never says *"you are FSSAI compliant"*. It says *"your label draft passes our pre-checks; final compliance is confirmed by FSSAI."*
- Category-specific rules are loaded from `rules-engine/fssai_rules.json` based on `product_category` field.
- Scale-specific rules differ by tier: Basic Registration allows simplified labels for some categories; State/Central License requires full Schedule 4 compliance.

### Category & Scale Rule Matrix

| Check | Basic Registration | State / Central License |
|---|---|---|
| Nutritional panel (100g) | Optional for some categories | Mandatory |
| Allergen statement | Mandatory | Mandatory |
| INS additive codes | Mandatory | Mandatory |
| Ingredient weight % | Recommended | Mandatory for compound ingredients |
| Font height validation | Full (Legal Metrology Rule 6) | Full |

---

## Agent 3 — Unit Economics & Pricing Agent

| Property | Detail |
|---|---|
| **Role** | True landed cost calculator and pricing guardrail |
| **Input** | `{ raw_material_cost_total, packaging_cost_per_pack, lpg_fuel_cost_batch, labour_cost_batch, nabl_lab_test_cost, nabl_amortised_batches, spoilage_percent, quantity_packed, target_mrp_per_pack, retail_channel_margin_pct }` |
| **Output** | `{ landed_cost_per_pack, break_even_mrp, margin_at_target_mrp_percent, is_profitable, is_below_landed_cost, alert, per_pack_breakdown }` |

### Guardrails

- If `target_mrp < landed_cost_per_pack`, the agent **blocks label generation** and shows a loss alert in the owner's regional language.
- The agent **never sets the price** — it shows the owner the break-even MRP and lets the owner choose their final MRP.
- All calculations use `unitMarginCalculator.js` — the LLM formats the output for display only.

### Sample Calculation

```
Raw material (6kg mango batch → 20 packs × 250g): ₹180 total → ₹9.00/pack
Packaging (jar + lid + label): ₹8.50/pack
LPG fuel (₹30 batch → 20 packs): ₹1.50/pack
Labour (₹100 batch → 20 packs): ₹5.00/pack
NABL lab test (₹2000 / 10 batches / 20 packs): ₹1.00/pack
Spoilage uplift (5%): ₹0.45/pack
─────────────────────────────────────────────────
TRUE LANDED COST:  ₹25.45/pack
Break-even MRP (20% retail margin): ₹31.81/pack
Owner's target MRP: ₹35.00/pack ✅ Margin: 27.3%
```

---

## Agent 4 — Batch Traceability & Lab-Guardrail Agent

| Property | Detail |
|---|---|
| **Role** | Lot tracking, shelf-life guardrail, and NABL referral notice generator |
| **Input** | Batch record + product category + declared best-before date + NABL test status |
| **Output** | `{ batch_id, nabl_reminder_sent, days_to_expiry, nabl_referral_notice_pdf_url, shelf_life_valid }` |

### Batch ID Format

```
{CATEGORY_CODE}-{YYYYMMDD}-B{SEQUENCE}

Examples:
  MNG-20261115-B01   (Raw Mango Pickle, 15 Nov 2026, Batch 1)
  SPW-20261115-B03   (Spice Powder, 15 Nov 2026, Batch 3)
  FLR-20261115-B01   (Flour Mill Product, 15 Nov 2026, Batch 1)
  MLT-20261115-B02   (Millet Snack, 15 Nov 2026, Batch 2)
```

### Shelf-Life Guardrail Rules (by Category)

| Category | Default Safe Window (without NABL report) | With NABL Report |
|---|---|---|
| Oil-based Pickles | 6 months | Up to 24 months |
| Dry Spice Powders | 9 months | Up to 18 months |
| Millet Snacks | 3 months | Up to 12 months |
| Flour Mill Products | 3 months (atta), 6 months (maida) | Up to 12 months |
| Papads | 6 months | Up to 12 months |
| Cold-Pressed Oils | 6 months | Up to 12 months |

> If `best_before_date` exceeds the default safe window **and** no NABL report URL is on file, the agent **hard-blocks label printing** and auto-generates a NABL Lab Referral Notice PDF in the owner's regional language.

---

## Human-in-the-Loop Checkpoint

After all 4 agents complete:

1. Owner is shown a **summary screen in their regional language** with:
   - Sorted ingredient list
   - Allergen flags (if any)
   - Compliance score and missing fields
   - True landed cost and margin
   - Batch ID and best-before date
   - NABL status

2. Owner must tap **"I Approve This Batch"** (voice-confirmed in regional language).

3. System **timestamps the sign-off** (owner name + timestamp + device fingerprint) and locks the Batch Passport.

4. **No label PDF can be generated without this sign-off.** This is enforced at the API route level, not just the UI.

> **Regulatory Boundary:** AhaarSetu AI supports the owner's decision-making process. It does not certify food safety, shelf-life, or regulatory compliance. These remain exclusively with FSSAI and NABL-accredited testing laboratories.
