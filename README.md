# AhaarSetu AI

### Speak Your Recipe. Prove Compliance. Unlock Bigger Markets.

**An Offline-First Vernacular Agentic AI Co-Pilot & Digital Batch Passport Platform for Micro Food Processors.**

**Tech4Bharat – GAVS Hackathon 2026**
**Problem Statement 6.3** | **Agriculture and Food Processing** | **Agentic AI**

---

## 1. Overview

Home-based and micro food processing units form the backbone of India's local food economy—producing pickles, spice powders (podis/masalas), millet snacks, papads, and cold-pressed oils. However, most micro-units handle food safety registration tiers, ingredient labelling, batch logs, shelf-life estimation, and unit costing informally. Because they lack compliant labels and traceable batch documentation, organised supermarkets, regional distributors, and online marketplaces (ONDC, Amazon, BigBasket) reject their products—locking them out of markets beyond their town.

**AhaarSetu AI** solves both compliance readiness and unit economics through one integrated, low-literacy mobile platform that helps micro food processors:

- Log daily recipes and production batches via **vernacular voice input** (Telugu, Kannada, Hindi, Tamil).
- Generate **print-ready FSSAI & Legal Metrology compliant label drafts** with automatic descending ingredient sorting, allergen detection, and 100g nutritional panels.
- Compute **true landed unit costs and retail channel margins** to prevent selling at a loss.
- Maintain **traceable batch records** linked to raw ingredient purchase dates.
- Generate **QR-linked Digital Batch Passports** and **1-page Buyer Readiness Dossiers** for retail onboarding.

Our initial implementation focuses on **pickles, spice powders, and millet snacks**, with a modular rule architecture designed to expand across all micro food categories.

---

## 2. Problem Statement

**Problem 6.3:** *Micro food processors cannot meet the requirements to sell beyond their town.*

Home-based and women-led micro food units currently rely on memory, handwritten registers, and locally printed stickers. This creates six critical bottlenecks:

| Challenge | Current Informal Practice | Real-World Impact |
|---|---|---|
| **FSSAI Registration Gaps** | Holding basic registration without knowing turnover thresholds or product category codes for inter-state/online sales. | Immediate rejection by supermarket procurement teams and e-commerce onboarding portals. |
| **Non-Compliant Labels** | Locally printed stickers missing descending ingredient weights, 100g nutrition tables, allergen alerts, and required font heights. | Exposure to misbranding penalties (up to ₹3 lakh under FSS Act) and stock rejection. |
| **Memory-Based Batches** | Recipes measured informally without batch IDs or raw-material lot tracking. | Zero recall traceability; if one jar spoils, the entire consignment is rejected. |
| **Guessed Shelf-Life** | Copying expiry dates from competitors without lab validation or moisture/preservative checks. | Post-sale spoilage, customer complaints, and damaged brand reputation. |
| **Guesswork Pricing** | Pricing based only on raw ingredients, ignoring jars/pouches, LPG fuel, labour, spoilage, and 15–25% retail margins. | Micro-units unknowingly sell below true cost when scaling into retail channels. |
| **Buyer Trust Gap** | No structured quality, lab, or batch documentation to share with outside buyers. | Retail buyers face high onboarding friction and avoid sourcing from small units. |

---

## 3. Our Solution

AhaarSetu AI combines three tightly integrated modules built specifically for low-literacy users on entry-level Android smartphones:

### A. Vernacular Voice-to-Batch & Label Engine

A voice-first intake workflow that converts spoken kitchen recipes into structured production logs and compliant label drafts:

1. Owner selects or creates a food product profile.
2. Owner taps the microphone and speaks the batch details in their mother tongue (*e.g., "6 kg raw mango, 1.5 kg gingelly oil, 1 kg chilli powder, packed in 250g jars"*).
3. Local measurements (*pavu*, *seer*, tins) are normalized into metric grams.
4. Ingredients are automatically sorted in **descending order of weight** per FSSAI Labelling & Display Regulations.
5. Mandatory **allergens** (mustard, sesame, groundnut, gluten, milk) and **INS additive codes** are flagged.
6. Approximate **macro-nutrition per 100g** is calculated from Indian food composition datasets.
7. A **print-ready PDF sticker** (formatted to Legal Metrology font-height rules) is generated for local DTP print shops.

### B. Multi-Agent Compliance & Costing Co-Pilot (Powered by Lyzr AI)

AhaarSetu orchestrates four bounded AI agents paired with a deterministic rule engine so regulatory text never hallucinates:

1. **Vernacular Intake Agent:** Transcribes regional speech and extracts structured ingredient weights, pack sizes, and batch quantities.
2. **FSSAI & Legal Metrology Compliance Agent:** Checks Basic vs. State license thresholds, maps food category codes, and validates mandatory label declarations.
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

> **Important Regulatory Boundary:** AhaarSetu AI operates strictly on the **support side of compliance**. Certifying food safety and shelf-life remains exclusively with **FSSAI and NABL-accredited testing labs**, and the **human business owner retains mandatory final sign-off authority** on every label and selling price before printing.

---

## 4. How AhaarSetu AI Works

```text
MICRO FOOD PROCESSOR
        |
        v
VERNACULAR VOICE INPUT (Telugu / Kannada / Hindi)
        |
        v
METRIC RECIPE NORMALIZER
        |
   +--------+--------+
   |                 |
   v                 v
FSSAI LABEL      UNIT COSTING &
RULE ENGINE      MARGIN ENGINE
   |                 |
   +--------+--------+
        |
        v
NABL LAB REMINDER & GUARDRAIL
        |
        v
MANDATORY OWNER SIGN-OFF (Human-in-the-Loop Check)
        |
   +--------+--------+
   |                 |
   v                 v
PRINT-READY PDF   DIGITAL BATCH
LABEL STICKER     PASSPORT (QR)
                      |
                      v
              WHATSAPP BUYER DOSSIER
                      |
                      v
          SUPERMARKET / ONDC BUYER
```

---

## 5. Offline-First Architecture

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
        |
        v
DEXIE.JS (INDEXEDDB STORAGE)
        |
        v
OWNER REVIEW & SIGN-OFF
        |
        v
CLIENT-SIDE PDF LABEL + QR CODE
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
MONGODB ATLAS + LYZR AI
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

## 6. Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Frontend (Mobile PWA) | React (Vite) + Tailwind CSS + vite-plugin-pwa | Low-literacy, icon-first mobile interface installable on entry-level Android phones. |
| Offline Local Storage | Dexie.js (IndexedDB) | Stores recipes, batch logs, and pending sync queues offline. |
| Vernacular Speech | Bhashini API / Web Speech ASR & TTS | Enables native-language voice intake and audio read-aloud confirmations. |
| Agentic AI Workflows | Lyzr AI Multi-Agent Framework | Orchestrates bounded intake, compliance, costing, and lab-guardrail agents. |
| Backend & Rule Engine | Node.js + Express.js + Deterministic JSON Validator | Enforces strict FSSAI Regulation 5 and Legal Metrology formatting rules. |
| Cloud Database | MongoDB Atlas + Mongoose | Stores user profiles, product masters, batch lineage, and sync logs. |
| Nutrition Reference | ICMR–NIN IFCT Dataset (JSON) | Provides standardized Indian ingredient macro-nutrients per 100g. |
| Label & QR Generation | jsPDF + html2canvas + qrcode.react | Generates print-ready DTP sticker PDFs and scannable batch QR codes in-browser. |
| Deployment | Vercel (PWA) + Render (Node/Express API) | HTTPS-enabled cloud hosting for mobile mic access and PWA installation. |

---

## 7. Regulatory & Dataset Foundation

AhaarSetu grounds its compliance logic and nutritional calculations in established Indian public standards:

- **FSSAI (Food Safety and Standards) Packaging & Labelling Regulations:** Governs descending ingredient weight ordering, vegetarian/non-vegetarian symbols, allergen declarations, INS additive naming, and FoSCoS Basic vs. State license criteria ([fssai.gov.in](https://www.fssai.gov.in/)).
- **Legal Metrology (Packaged Commodities) Rules:** Governs net quantity declarations, MRP formatting, and minimum numeral/font heights relative to the Principal Display Panel (PDP) area.
- **ICMR–NIN Indian Food Composition Tables (IFCT):** Provides verified nutritional values per 100g for Indian raw ingredients (spices, pulses, millets, oils, fruits) used to compute indicative nutrition panels ([nin.res.in](https://www.nin.res.in/)).
- **PMFME & One District One Product (ODOP) Ecosystem:** Aligns onboarding workflows with District Resource Persons (DRPs) supporting micro food enterprise formalisation ([pmfme.mofpi.gov.in](https://pmfme.mofpi.gov.in/)).

---

## 8. Key Innovations

| Innovation | Value Delivered |
|---|---|
| Vernacular Voice-to-Label | Eliminates English and computer literacy barriers for home-based women entrepreneurs. |
| Hybrid AI + Deterministic Rule Engine | Combines Lyzr AI's language understanding with hard-coded FSSAI rules so legal declarations never hallucinate. |
| True Unit Costing Guardrail | Exposes hidden packaging, fuel, labour, and retail margin costs before units underprice their products. |
| Offline-First PWA Architecture | Works seamlessly on ₹7,000 Android phones in low-connectivity rural towns. |
| Strict Regulatory Boundary Design | Keeps human sign-off with the owner and food safety certification with NABL labs. |
| Digital Batch Passport & Buyer Dossier | Converts informal kitchen logs into standardized, QR-verifiable proof for retail buyers. |

---

## 9. Business Model

AhaarSetu follows a sustainable B2B2C ecosystem model:

- **Freemium Micro-Processor Tier:** Free vernacular batch logging and basic unit costing forever so any home-based unit can adopt the platform at zero risk.
- **Pro Compliance Subscription (₹99/month):** Unlimited print-ready FSSAI label generation, hosted QR Batch Passports, and multi-SKU cost tracking.
- **B2B Retail & Aggregator Onboarding SaaS:** Regional supermarket chains, distributors, and ONDC seller networks pay a discovery and onboarding fee to source pre-verified, retail-ready micro-suppliers—dramatically reducing buyer vendor-vetting costs.
- **Institutional / FPO Cluster Licensing:** Bulk onboarding partnerships with SHG federations, FPOs, and PMFME support agencies.

---

## 10. Expected Impact

- **Unlocking New Markets:** Enables home-based pickle, spice, and snack units to meet supermarket and e-commerce onboarding standards.
- **Preventing Financial Losses:** Protects micro-processors from underpricing retail orders and reduces full-shipment rejections through targeted batch recalls.
- **Regulatory Safety:** Reduces accidental misbranding violations while guiding units toward accredited NABL lab testing.
- **Empowering Women Entrepreneurs:** Built specifically around the workflow and device realities of women-led micro enterprises and SHGs.

---

## 11. Development Roadmap

- **Phase 1 (Round 1 – Idea & Architecture):** Field discovery with local micro food units, FSSAI rule mapping, and multi-agent system design.
- **Phase 2 (Prototype Sprint – Core Engine):** MongoDB/Dexie schemas, IFCT nutrition integration, deterministic FSSAI label sorter, and unit costing calculator.
- **Phase 3 (Prototype Sprint – Lyzr AI & Vernacular UI):** 4-agent Lyzr AI pipeline, regional voice intake, and offline-first mobile PWA interface.
- **Phase 4 (Prototype Sprint – Passports & Human Sign-Off):** Mandatory owner approval workflow, print-ready PDF sticker generator, and QR Batch Passport verification screen.
- **Phase 5 (Field Testing & Finale):** Usability testing with local pickle/spice makers, incorporating feedback, and live demonstration at GAVS 2026.

---

## 12. Project Status

AhaarSetu AI is being developed as a proposed solution for **Tech4Bharat – GAVS Hackathon 2026 (Problem Statement 6.3)**.

The architecture, multi-agent workflows, and offline synchronization design documented in this repository represent our **Round 1 technical blueprint**.

Prototype implementation begins immediately upon Round 2 shortlisting (23 November 2026), with simulated FSSAI/NABL handshakes clearly disclosed for hackathon demonstration scope.

We do not claim commercial partnerships, pilot metrics, or regulatory certifications without verified field evidence.

---

## 13. Future Scope

- Direct catalog syndication APIs to ONDC (Open Network for Digital Commerce) seller apps.
- Integrated slot booking and digital report ingestion with NABL-accredited food testing labs.
- Automated GS1 India barcode registration assistance for scaling units.
- Community raw-material bulk procurement matching across nearby SHGs and micro-units.

---

## 14. Hackathon Information

| Field | Detail |
|---|---|
| **Event** | Tech4Bharat – Global Accelerator Vision Summit (GAVS) Hackathon 2026 |
| **Theme** | Agriculture and Food Processing |
| **Problem Statement** | 6.3 – Micro food processors cannot meet the requirements to sell beyond their town |
| **Category** | Agentic AI |
| **Project** | AhaarSetu AI |

---

## 15. Project Vision

> *From Informal Kitchens to Compliant Brands.*
> *From Local WhatsApp Sales to National Retail Shelves.*

**AhaarSetu AI — Speak Your Recipe. Prove Compliance. Unlock Bigger Markets.**
