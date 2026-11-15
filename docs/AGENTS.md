# AhaarSetu AI — Multi-Agent Design

**Powered by Lyzr AI Multi-Agent Framework**

## Agent Definitions

### 1. Vernacular Intake Agent
- **Role:** Speech-to-structured-data converter
- **Input:** Raw vernacular speech transcript (Telugu/Kannada/Hindi/Tamil)
- **Output:** `{ ingredients: [{name, weight_grams}], pack_size_grams, quantity_packed, batch_date }`
- **Guardrails:** Must extract numeric weights; if ambiguous, asks clarifying voice prompt

### 2. FSSAI & Legal Metrology Compliance Agent
- **Role:** Label validator and compliance checker
- **Input:** Structured ingredient list + product category + FSSAI number
- **Output:** `{ label_valid: bool, missing_fields: [], allergen_flags: [], ins_codes: [], compliance_score: 0-100 }`
- **Guardrails:** All decisions backed by deterministic `fssai_rules.json`; never hallucinates regulatory text

### 3. Unit Economics & Pricing Agent
- **Role:** True landed cost calculator
- **Input:** Ingredient costs + packaging + LPG fuel + labour + amortised lab testing + target MRP
- **Output:** `{ landed_cost_per_pack: ₹, break_even_mrp: ₹, margin_at_target_mrp: %, is_profitable: bool }`
- **Guardrails:** Alerts owner if `margin_at_target_mrp < 0` before allowing label print

### 4. Batch Traceability & Lab-Guardrail Agent
- **Role:** Lot tracking and NABL lab reminder trigger
- **Input:** Batch record + best-before date + NABL test status
- **Output:** `{ batch_id: "MNG-20261115-B01", nabl_reminder_sent: bool, days_to_expiry: int }`
- **Guardrails:** Cannot set `best_before_date` beyond safe window without NABL report URL on file

## Human-in-the-Loop Checkpoint

After all 4 agents complete:
- Owner is shown a summary screen in their regional language
- Owner must tap **"I Approve This Batch"** (voice-confirmed)
- System timestamps the sign-off and locks the batch passport
- **No label can be printed without this sign-off**
