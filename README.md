# AhaarSetu AI

### Speak Your Recipe. Prove Compliance. Unlock Bigger Markets.

**An Offline-First Vernacular Agentic AI Co-Pilot & Digital Batch Passport Platform for Micro Food Processors.**

**Tech4Bharat – GAVS Hackathon 2026**
**Problem Statement 6.3** | **Agriculture and Food Processing** | **Agentic AI**

---

## 1. Overview

Home-based and micro food processing units form the backbone of India's local food economy — producing **pickles, spice powders (podis/masalas), millet snacks, papads, flour mill products, and cold-pressed oils**. Most micro-units handle food safety registration, ingredient labelling, batch logs, shelf-life estimation, and unit costing informally, and get rejected by supermarkets, regional distributors, and online marketplaces (ONDC, Amazon, BigBasket) as a result.

**AhaarSetu AI** solves compliance readiness and unit economics through one integrated, low-literacy mobile platform:

- Log daily batches via **vernacular voice input** (Telugu, Kannada, Hindi, Tamil).
- Generate **print-ready FSSAI & Legal Metrology compliant label drafts** with descending ingredient sorting, allergen detection, and 100g nutritional panels.
- Compute **true landed unit costs and retail margins** to prevent selling at a loss.
- Maintain **traceable batch records** linked to raw ingredient purchase dates.
- Generate **QR-linked Digital Batch Passports** and **1-page Buyer Readiness Dossiers** for retail onboarding.

Our initial implementation focuses on **pickles, spice powders, millet snacks, and flour mill products**, with a modular rule architecture designed to expand across all micro food categories.

---

## 2. Problem Statement

**Problem 6.3:** *Micro food processors cannot meet the requirements to sell beyond their town.*

Home-based and women-led micro food units rely on memory, handwritten registers, and locally printed stickers. This creates six critical bottlenecks:

| Challenge | Current Informal Practice | Real-World Impact |
|---|---|---|
| **FSSAI Registration Gaps** | Holding basic registration without knowing turnover thresholds or category codes for inter-state/online sales. | Immediate rejection by supermarket procurement teams and e-commerce onboarding portals. |
| **Non-Compliant Labels** | Stickers missing descending ingredient weights, 100g nutrition tables, allergen alerts, and required font heights. | Exposure to misbranding penalties (up to ₹3 lakh under FSS Act) and stock rejection. |
| **Memory-Based Batches** | Recipes measured informally without batch IDs or raw-material lot tracking. | Zero recall traceability; if one jar spoils, the entire consignment is rejected. |
| **Guessed Shelf-Life** | Copying expiry dates from competitors without lab validation or moisture checks. | Post-sale spoilage, customer complaints, and damaged brand reputation. |
| **Guesswork Pricing** | Pricing based only on raw ingredients, ignoring jars, LPG fuel, labour, spoilage, and 15–25% retail margins. | Micro-units unknowingly sell below true cost when scaling into retail channels. |
| **Buyer Trust Gap** | No structured quality, lab, or batch documentation to share with outside buyers. | Retail buyers face high onboarding friction and avoid sourcing from small units. |

---

### 2B. Ecosystem Stakeholders & Field Discovery Alignment

AhaarSetu AI is designed to serve **all four stakeholder groups** identified in the PS 6.3 brief and to answer **all six field discovery questions** raised during problem scoping.

#### Stakeholder Coverage

| Stakeholder | Pain Point | How AhaarSetu Addresses It |
|---|---|---|
| **Food Safety Officers (FSSAI / State FDA)** | Difficulty verifying that micro-units hold the correct registration tier for their turnover and sales channel. | The FSSAI Compliance Agent auto-checks declared annual turnover against ₹12 lakh Basic / ₹20 crore State license thresholds and flags any mismatch. Every Batch Passport carries the FSSAI number and tier for officer inspection. |
| **Retailers & Online Marketplaces** | High vendor-vetting friction; no standardised, verifiable batch documentation from small suppliers. | The Digital Batch Passport with a scannable QR code provides retailers one-click access to ingredient lineage, allergen summary, lab test status, and owner sign-off. |
| **Packaging Suppliers** | Micro-units order incorrect pack sizes because they do not calculate accurate batch yields in advance. | The Unit Economics Agent computes exact jar/pouch quantities required per batch from declared batch weight and pack-size selection. |
| **NABL-Accredited Testing Labs** | Labs struggle to explain shelf-life testing requirements to low-literacy micro-unit owners in local languages. | The Batch Traceability Agent generates a vernacular-language NABL Lab Referral Notice PDF with product category, moisture range, and test parameters pre-filled. |

#### Field Discovery Question Answers

| Field Discovery Question | AhaarSetu's Direct Answer |
|---|---|
| **Q1 — FSSAI Registration Tier Awareness** | The Compliance Agent compares declared turnover to tier thresholds and shows a plain-language upgrade prompt in the owner's regional language if a State License is required. |
| **Q2 — Retailer Onboarding Requirements** | The Buyer Readiness Dossier pre-populates nine fields most commonly required by retail buyers: FSSAI number, category code, batch lot ID, ingredient declaration, allergen statement, nutritional panel, MRP, lab test status, and QR verification link. |
| **Q3 — Batch & Ingredient Recording** | The Vernacular Voice-to-Batch Engine accepts spoken input in Telugu/Kannada/Hindi/Tamil and converts it into a structured batch log with ingredient weights, purchase dates, and lot codes — requiring zero writing or typing. |
| **Q4 — Lab-Backed Shelf Life** | The Batch Traceability Agent enforces a hard guardrail: best-before windows beyond the category's default safe period are blocked until a NABL lab report URL is recorded. |
| **Q5 — True Unit Costing** | The Unit Economics Agent captures raw material cost, packaging, LPG/fuel, labour, amortised NABL lab test fee, and retail channel margin — and alerts the owner if the target MRP falls below the break-even price. |
| **Q6 — Targeted Batch Recall** | Every production run receives a unique Batch ID (e.g., `MNG-20261115-B01`) linked to raw ingredient purchase dates. If a recall is needed, the system identifies exactly which jars belong to the affected lot. |

> **Regulatory Boundary:** AhaarSetu operates strictly on the **support side of compliance**. FSSAI registration, food safety certification, and shelf-life validation remain exclusively with the **regulator and NABL-accredited labs**. The human business owner holds **mandatory final sign-off authority** on every label and selling price before printing.

---

## 3. Our Solution

AhaarSetu AI combines three tightly integrated modules built for low-literacy users on entry-level Android smartphones:

### A. Vernacular Voice-to-Batch & Label Engine

A voice-first intake workflow that converts spoken kitchen recipes into structured production logs and compliant label drafts:

1. Owner selects or creates a food product profile.
2. Owner speaks the batch details in their mother tongue (*e.g., "6 kg raw mango, 1.5 kg gingelly oil, 1 kg chilli powder, packed in 250g jars"*).
3. Local measurements (*pavu*, *seer*, tins) are normalized into metric grams.
4. Ingredients are automatically sorted in **descending order of weight** per FSSAI Labelling & Display Regulations.
5. Mandatory **allergens** (mustard, sesame, groundnut, gluten, milk) and **INS additive codes** are flagged.
6. Approximate **macro-nutrition per 100g** is calculated from Indian food composition datasets.
7. A **print-ready PDF sticker** (formatted to Legal Metrology font-height rules scaled by pack size) is generated for local DTP print shops.

### B. Multi-Agent Compliance & Costing Co-Pilot (Powered by Lyzr AI)

AhaarSetu orchestrates four bounded AI agents paired with a deterministic rule engine so regulatory text never hallucinates:

1. **Vernacular Intake Agent:** Transcribes regional speech and extracts structured ingredient weights, pack sizes, and batch quantities.
2. **FSSAI & Legal Metrology Compliance Agent:** Checks Basic vs. State license thresholds, maps food category codes, and validates mandatory label declarations. Applies **category-specific rules** (e.g., moisture limits for flour mill products differ from oil-based pickles) and **scale-specific rules** (Basic Registration vs. State vs. Central License).
3. **Unit Economics & Pricing Agent:** Calculates true landed cost per pack (raw materials + packaging + fuel + labour + amortised lab testing + retail margin) and alerts the owner if their selling price loses money.
4. **Batch Traceability & Lab-Guardrail Agent:** Assigns lot codes, tracks expiry windows, and triggers reminders to connect with **NABL-accredited food testing labs** for shelf-life validation.

### C. Digital Batch Passport & Owner Sign-Off

After each batch is logged, the system generates a structured digital record:

| Field | Description |
|---|---|
| **Batch ID** | Unique lot identifier (e.g., `MNG-20261115-B01`) |
| **Manufacturer Details** | Unit name, district, and FSSAI registration/license number |
| **Product & Pack Size** | Verified product name, category code, and net weight |
| **Ingredient & Lot Lineage** | Descending weight composition + raw ingredient purchase dates |
| **Nutrition & Allergen Summary** | Calculated 100g nutritional profile and mandatory allergen warnings |
| **Lab Test Status** | Link/status of NABL-accredited lab shelf-life or quality test report |
| **Unit Cost & Wholesale Sheet** | Verified break-even cost and retail margin structure |
| **Owner Approval** | Mandatory human sign-off timestamp by the business owner |
| **QR Code & Buyer Dossier** | Scannable QR code + 1-page WhatsApp PDF for supermarket/ONDC buyers |

> **Important Regulatory Boundary:** Certifying food safety and shelf-life remains exclusively with **FSSAI and NABL-accredited testing labs**. The **human business owner retains mandatory final sign-off authority** on every label and selling price before printing.

---

## 4. How AhaarSetu AI Works

```text
MICRO FOOD PROCESSOR
        |
        v
VERNACULAR VOICE INPUT (Telugu / Kannada / Hindi / Tamil)
        |
        v
METRIC RECIPE NORMALIZER (pavu / seer / tin → grams)
        |
   +----+----+
   |         |
   v         v
FSSAI      UNIT COSTING &
LABEL      MARGIN ENGINE
RULE       (raw material +
ENGINE     packaging + LPG +
(category  labour + lab fee)
 + scale)
   |         |
   +----+----+
        |
        v
NABL LAB REMINDER & GUARDRAIL
        |
        v
MANDATORY OWNER SIGN-OFF (Human-in-the-Loop)
        |
   +----+----+
   |         |
   v         v
PRINT-READY  DIGITAL BATCH
PDF LABEL    PASSPORT (QR)
STICKER           |
                  v
         WHATSAPP BUYER DOSSIER
                  |
                  v
      SUPERMARKET / ONDC BUYER
```

---

## 5. Modular Rule Engine — Category & Scale Handling

AhaarSetu's compliance engine is explicitly modular: rules are loaded per **product category** and per **business scale tier**, so the same codebase handles a home pickle maker (Basic Registration, ₹5 lakh turnover) and a growing millet snack unit (State License, ₹80 lakh turnover) without code duplication.

### Category-Specific Rule Variations

| Product Category | Key Rule Variations Applied |
|---|---|
| **Pickles & Chutneys** | Acidity / salt % disclosure; oil-type declaration; moisture < 25% for shelf-stable claim. |
| **Spice Powders / Masalas** | Mandatory INS colourant codes (e.g., INS 160a); no synthetic colour without disclosure; moisture < 10%. |
| **Millet Snacks** | Millet variety (Foxtail, Ragi, Jowar) must appear first in name if > 50% by weight; trans-fat declaration. |
| **Flour Mill Products** | Fortification status (Iron, Folic Acid per FSSAI order); ash content disclosure for atta/maida. |
| **Papads** | Preservative disclosure (potassium metabisulphite, INS 224); allergen flag for gluten and black pepper. |
| **Cold-Pressed Oils** | "Cold-pressed / Expeller-pressed" claim validation; free fatty acid (FFA) % limits. |

### Scale-Specific Rule Variations

| FSSAI Tier | Turnover Threshold | Rule Differences |
|---|---|---|
| **Basic Registration** | < ₹12 lakh/year | Local / intra-state sales; simplified label (no mandatory nutrition panel for some categories); 14-digit registration suffix `R`. |
| **State License** | ₹12 lakh – ₹20 crore/year | Inter-state and e-commerce sales mandatory; full nutrition panel; allergen statement required; 14-digit license suffix `L`. |
| **Central License** | > ₹20 crore/year | Multi-state manufacturer; GMP audit; complete Schedule 4 label compliance. |

> The rule engine **enforces these variations automatically** based on the owner's declared category and registered tier. It never advises on the actual registration or certification process — that remains with FSSAI and NABL. The **human business owner signs off every output before use**.

---

## 6. Offline-First Architecture

Micro food units frequently operate in rural towns and home kitchens with intermittent 2G/3G connectivity. AhaarSetu is engineered as an offline-first Progressive Web App (PWA):

### Offline Workflow (Zero Internet Required)

```text
LOW-COST ANDROID PHONE (PWA)
        |
        v
LOCAL VOICE / FORM INPUT
        |
        v
DETERMINISTIC LOCAL RULE ENGINE
(category + scale rules from cached JSON)
        |
        v
DEXIE.JS (INDEXEDDB STORAGE)
        |
        v
OWNER REVIEW & SIGN-OFF
        |
        v
CLIENT-SIDE PDF LABEL + QR CODE
(jsPDF + qrcode.js — no cloud needed)
```

### Online Synchronization (When Connectivity Returns)

```text
LOCAL QUEUED BATCH RECORDS
        |
        v
INTERNET DETECTED
        |
        v
SECURE REST SYNC (EXPRESS)
        |
        v
MONGODB ATLAS + LYZR AI ENRICHMENT
        |
        v
SHAREABLE BUYER VERIFICATION LINK
```

### Core Offline Capabilities

- Local product profiles and ingredient nutrition lookup cached on-device.
- Offline batch logging and unit margin calculation via Dexie.js (IndexedDB).
- Client-side print-ready PDF label and QR code generation using jsPDF and qrcode.react without waiting for cloud round-trips.
- Automatic background synchronization to MongoDB Atlas when mobile data reconnects.

---

## 7. Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Frontend (Mobile PWA) | React (Vite) + Tailwind CSS + vite-plugin-pwa | Low-literacy, icon-first mobile interface installable on entry-level Android phones. |
| Offline Local Storage | Dexie.js (IndexedDB) | Stores recipes, batch logs, and pending sync queues offline. |
| Vernacular Speech | Bhashini API / Web Speech ASR & TTS | Enables native-language voice intake and audio read-aloud confirmations. |
| Agentic AI Workflows | Lyzr AI Multi-Agent Framework | Orchestrates bounded intake, compliance, costing, and lab-guardrail agents. |
| Backend & Rule Engine | Node.js + Express.js + Deterministic JSON Validator | Enforces strict FSSAI Regulation 5 and Legal Metrology formatting rules per category and scale tier. |
| Cloud Database | MongoDB Atlas + Mongoose | Stores user profiles, product masters, batch lineage, and sync logs. |
| Nutrition Reference | ICMR–NIN IFCT Dataset (JSON) | Provides standardized Indian ingredient macro-nutrients per 100g. |
| Label & QR Generation | jsPDF + html2canvas + qrcode.react | Generates print-ready DTP sticker PDFs and scannable batch QR codes in-browser. |
| Deployment | Vercel (PWA) + Render (Node/Express API) | HTTPS-enabled cloud hosting for mobile mic access and PWA installation. |

> *Technology choices may evolve during implementation and benchmarking.*

---

## 8. AI & Research Foundation

Each AI technique in AhaarSetu is grounded in peer-reviewed research. The deterministic rule engine ensures that regulatory text is never generated by the LLM alone.

---

**IndicWhisper / Bhashini Vernacular ASR**

Explores fine-tuned Whisper speech recognition models for low-resource Indian languages (Telugu, Kannada, Hindi, Tamil) in noisy home-kitchen environments.

Research: *Towards Whispering in Indian Languages.*
INTERSPEECH 2023.
[https://arxiv.org/abs/2306.07728](https://arxiv.org/abs/2306.07728)

---

**Retrieval-Augmented Regulatory Grounding (RAG)**

Combines parametric LLMs with non-parametric regulatory knowledge retrieval so FSSAI category rules and allergen declarations stay grounded without hallucination.

Research: *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.*
NeurIPS 2020.
[https://arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401)

---

**Bounded Tool-Calling Agent Workflows (ReAct)**

Interleaves step-by-step reasoning with deterministic rule-engine and unit-costing tool calls to keep compliance calculations auditable.

Research: *ReAct: Synergizing Reasoning and Acting in Language Models.*
ICLR 2023.
[https://arxiv.org/abs/2210.03629](https://arxiv.org/abs/2210.03629)

---

**Local-First Offline Synchronization**

Enables mobile web apps to read/write batch logs locally on-device with zero network latency and sync cleanly when rural connectivity returns.

Research: *Local-First Software: You Own Your Data, in Spite of the Cloud.*
ACM SIGPLAN Onward! 2019.
[https://www.inkandswitch.com/local-first/](https://www.inkandswitch.com/local-first/)

---

### Regulatory & Public Datasets

- **FSSAI Food Safety and Standards (Labelling & Display) Regulations** — Governs descending ingredient weight ordering, vegetarian/non-vegetarian symbols, allergen declarations, INS additive naming, and FoSCoS Basic vs. State license criteria. ([fssai.gov.in](https://www.fssai.gov.in/))
- **Legal Metrology (Packaged Commodities) Rules** — Governs net quantity declarations, MRP formatting, and minimum font heights relative to the Principal Display Panel (PDP) area, scaled by pack size.
- **ICMR–NIN Indian Food Composition Tables (IFCT)** — Provides verified nutritional values per 100g for Indian raw ingredients (spices, pulses, millets, oils, fruits, flours) used to compute indicative nutrition panels. ([nin.res.in](https://www.nin.res.in/))
- **PMFME & One District One Product (ODOP) Ecosystem** — Aligns onboarding workflows with District Resource Persons (DRPs) supporting micro food enterprise formalisation. ([pmfme.mofpi.gov.in](https://pmfme.mofpi.gov.in/))

---

## 9. Key Innovations

| Innovation | Value Delivered |
|---|---|
| Vernacular Voice-to-Label | Eliminates English and computer literacy barriers for home-based women entrepreneurs. |
| Hybrid AI + Deterministic Rule Engine | Combines Lyzr AI's language understanding with hard-coded FSSAI rules so legal declarations never hallucinate. |
| Category & Scale-Aware Rule Modules | Applies the right FSSAI rules for each product type (flour mill vs. pickle vs. millet snack) and each registration tier (Basic vs. State License). |
| True Unit Costing Guardrail | Exposes hidden packaging, fuel, labour, and retail margin costs before units underprice their products. |
| Offline-First PWA Architecture | Works seamlessly on ₹7,000 Android phones in low-connectivity rural towns. |
| Strict Regulatory Boundary Design | Keeps human sign-off with the owner and food safety certification with NABL labs — the platform never certifies. |
| Digital Batch Passport & Buyer Dossier | Converts informal kitchen logs into standardized, QR-verifiable proof for retail buyers. |
| NABL Lab Referral Notice | Auto-generates a vernacular PDF referral with pre-filled test parameters to reduce lab intake friction. |

**Our central differentiation:** AhaarSetu AI does not merely generate text labels — it combines vernacular voice intake, true unit margin protection, and QR-verifiable batch passports into one offline-first workflow built specifically for micro food processors.

---

## 10. Business Model

AhaarSetu follows a sustainable B2B2C ecosystem model:

**1. Freemium Micro-Processor Tier**
Free vernacular batch logging and basic unit costing forever, so any home-based unit can adopt the platform at zero risk.

**2. Pro Compliance Subscription (₹99/month)**
Unlimited print-ready FSSAI label generation, hosted QR Batch Passports, and multi-SKU cost tracking.

**3. B2B Retail & Aggregator Onboarding SaaS**
Regional supermarket chains, distributors, and ONDC seller networks pay a discovery and onboarding fee to source pre-verified, retail-ready micro-suppliers — dramatically reducing vendor-vetting costs.

**4. Institutional / FPO Cluster Licensing**
Bulk onboarding partnerships with SHG federations, FPOs, and PMFME support agencies.

> *These models are proposed opportunities and require customer and field validation.*

---

## 11. Expected Impact

- **Unlocking New Markets:** Enables home-based pickle, spice, flour mill, and snack units to meet supermarket and e-commerce onboarding standards.
- **Preventing Financial Losses:** Protects micro-processors from underpricing retail orders and reduces full-shipment rejections through targeted batch recalls.
- **Regulatory Safety:** Reduces accidental misbranding violations while guiding units toward accredited NABL lab testing.
- **Empowering Women Entrepreneurs:** Built specifically around the workflow and device realities of women-led micro enterprises and SHGs.

> *The actual impact will be evaluated through micro-processor field pilots and measured operational outcomes.*

---

## 12. Development Roadmap

| Phase | Planned Work |
|---|---|
| **Phase 1** — Round 1: Idea & Architecture | Field discovery with local micro food units, FSSAI rule mapping per category and scale tier, and multi-agent system design. |
| **Phase 2** — Prototype Sprint: Core Engine | MongoDB/Dexie schemas, IFCT nutrition integration, deterministic FSSAI label sorter with category/scale rule modules, and unit costing calculator. |
| **Phase 3** — Prototype Sprint: Lyzr AI & Vernacular UI | 4-agent Lyzr AI pipeline, regional voice intake (Bhashini), and offline-first mobile PWA interface. |
| **Phase 4** — Prototype Sprint: Passports & Human Sign-Off | Mandatory owner approval workflow, print-ready PDF sticker generator, QR Batch Passport screen, and NABL Lab Referral Notice generator. |
| **Phase 5** — Field Testing & Finale | Usability testing with local pickle/spice/flour-mill makers, incorporating feedback, and live demonstration at GAVS 2026. |

---

## 13. Project Status

AhaarSetu AI is being developed as a proposed solution for **Tech4Bharat – GAVS Hackathon 2026 (Problem Statement 6.3)**.

The architecture, multi-agent workflows, and offline synchronization design documented in this repository represent our **Round 1 technical blueprint**.

Prototype implementation begins immediately upon Round 2 shortlisting (23 November 2026), with simulated FSSAI/NABL handshakes clearly disclosed for hackathon demonstration scope.

We do not claim commercial partnerships, pilot metrics, or regulatory certifications without verified field evidence.

---

## 14. Future Scope

- Direct catalog syndication APIs to ONDC (Open Network for Digital Commerce) seller apps.
- Integrated slot booking and digital report ingestion with NABL-accredited food testing labs.
- Automated GS1 India barcode registration assistance for scaling units.
- Community raw-material bulk procurement matching across nearby SHGs and micro-units.
- Flour mill fortification compliance tracking (Iron + Folic Acid FSSAI mandate).

---

## 15. Hackathon Information

| Field | Detail |
|---|---|
| **Event** | Tech4Bharat – Global Accelerator Vision Summit (GAVS) Hackathon 2026 |
| **Theme** | Agriculture and Food Processing |
| **Problem Statement** | 6.3 – Micro food processors cannot meet the requirements to sell beyond their town |
| **Category** | Agentic AI |
| **Project** | AhaarSetu AI |

---

## 16. Project Vision

> *From Informal Kitchens to Compliant Brands.*
>
> *From Local WhatsApp Sales to National Retail Shelves.*

**AhaarSetu AI — Speak Your Recipe. Prove Compliance. Unlock Bigger Markets.**
