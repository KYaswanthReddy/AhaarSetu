# AhaarSetu AI — System Architecture

**Tech4Bharat – GAVS Hackathon 2026 | Problem Statement 6.3**

## High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│          MICRO FOOD PROCESSOR (Android PWA)      │
│                                                  │
│  ┌──────────────┐    ┌──────────────────────┐   │
│  │ Voice Input  │    │ Manual Form Input    │   │
│  │ (Bhashini /  │    │ (Icon-first UI,      │   │
│  │  Web Speech) │    │  Low-Literacy Mode)  │   │
│  └──────┬───────┘    └──────────┬───────────┘   │
│         └──────────┬────────────┘               │
│                    v                             │
│         ┌──────────────────┐                    │
│         │ Metric Normalizer │                   │
│         │ (pavu→g, seer→g) │                   │
│         └────────┬─────────┘                    │
│                  v                               │
│    ┌─────────────────────────────┐              │
│    │   Dexie.js (IndexedDB)      │              │
│    │   Offline Batch Queue        │              │
│    └─────────────────────────────┘              │
└─────────────────────────────────────────────────┘
                   │ (sync when online)
                   v
┌─────────────────────────────────────────────────┐
│          BACKEND (Node.js + Express)             │
│                                                  │
│  ┌────────────┐  ┌────────────┐  ┌───────────┐  │
│  │  Lyzr AI   │  │   FSSAI    │  │   Unit    │  │
│  │  Agents    │  │ Rule Engine│  │  Costing  │  │
│  │ (4-agent   │  │(Determinst)│  │  Engine   │  │
│  │  pipeline) │  └────────────┘  └───────────┘  │
│  └────────────┘                                  │
│                                                  │
│  ┌─────────────────────────────────────────┐    │
│  │         MongoDB Atlas                    │    │
│  │  Products | Batches | Users | Sync Logs │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
                   │
                   v
       ┌───────────────────────┐
       │  Outputs              │
       │  • PDF Label Sticker  │
       │  • Digital Batch QR   │
       │  • WhatsApp Dossier   │
       │  • Buyer Verify Link  │
       └───────────────────────┘
```

## Four Lyzr AI Agent Pipeline

| Agent | Input | Output |
|---|---|---|
| Vernacular Intake Agent | Regional speech / text | Structured ingredient weights + batch quantities |
| FSSAI Compliance Agent | Ingredient list + product category | Validated label draft + compliance flags |
| Unit Economics Agent | Ingredient costs + packaging + overheads | True landed cost per pack + margin alert |
| Batch Traceability Agent | Batch details + expiry window | Lot code + NABL lab reminder trigger |

## Data Flow (Offline → Online)

1. Owner speaks batch details → **Bhashini ASR** transcribes
2. **Metric Normalizer** converts local units → grams
3. **Dexie.js** saves batch record locally (offline-safe)
4. **Deterministic FSSAI Rule Engine** validates label fields locally
5. **jsPDF** generates print-ready sticker PDF in-browser
6. **qrcode.react** generates QR code pointing to future online passport
7. When online: **Express REST API** syncs to **MongoDB Atlas**
8. **Lyzr AI agents** perform cloud-side enrichment and compliance checks
9. **Owner sign-off** locks the batch passport
10. **Shareable QR verification URL** sent to buyer via WhatsApp
