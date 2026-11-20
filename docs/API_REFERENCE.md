# AhaarSetu AI — API Reference

## Base URL
`/api`

## Endpoints

### 1. Batches
- `GET /batches` — Retrieve latest 50 batch passports
- `POST /batches` — Create and sign new batch passport
- `GET /batches/:batchId` — Fetch batch passport by unique lot code

### 2. Products
- `GET /products` — List all registered product profiles
- `POST /products` — Create new product template

### 3. Users
- `GET /users/:phone` — Fetch micro-processor profile & FSSAI tier
- `POST /users/register` — Register or update user details

### 4. System Health
- `GET /health` — Service readiness probe
