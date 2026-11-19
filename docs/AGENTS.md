# AhaarSetu AI — Agent Specifications

## Agent 1: Vernacular Intake Agent
- **Input:** Regional speech / text (Telugu, Kannada, Hindi, Tamil)
- **Output:** Structured JSON — ingredient list with weights in grams, batch quantity, pack size
- **Tools:** Bhashini ASR API, Unit Normalizer
- **Guardrail:** Confirms each ingredient back to user before proceeding

## Agent 2: FSSAI & Legal Metrology Compliance Agent
- **Input:** Ingredient JSON + product category + FSSAI tier
- **Output:** Validated label draft with compliance flags
- **Tools:** Deterministic FSSAI Rule Engine (JSON), Allergen Detector
- **Guardrail:** Never generates regulatory text from LLM alone — rule engine enforces all declarations

## Agent 3: Unit Economics & Pricing Agent
- **Input:** Ingredient costs + packaging + LPG + labour + lab fee + target MRP
- **Output:** True landed cost per pack, margin %, break-even alert
- **Tools:** Unit Margin Calculator
- **Guardrail:** Blocks label generation if MRP < break-even cost

## Agent 4: Batch Traceability & Lab-Guardrail Agent
- **Input:** Batch details + declared shelf life
- **Output:** Unique Batch ID, expiry window, NABL lab referral notice PDF
- **Tools:** Batch ID Generator, PDF generator
- **Guardrail:** Extended best-before dates blocked until NABL lab report URL is recorded
