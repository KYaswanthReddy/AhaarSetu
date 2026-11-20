# AhaarSetu AI — Deployment Guide

## Architecture Overview
- **Frontend PWA:** Hosted on Vercel with HTTPS for microphone access.
- **Backend API:** Hosted on Render / Railway with Node.js & Express.
- **Database:** MongoDB Atlas (M0 Free Tier or Dedicated Cluster).

## Environment Setup

### Frontend (.env)
```env
VITE_API_URL=https://ahaarsetu-api.onrender.com/api
VITE_BHASHINI_ENDPOINT=https://dhruva-api.bhashini.gov.in
```

### Backend (.env)
```env
PORT=4000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ahaarsetu
LYZR_API_KEY=your_lyzr_api_key
```

## Production Verification Checklist
- [x] HTTPS enabled for mobile microphone permissions
- [x] IndexedDB Dexie database initialized on first PWA launch
- [x] Service worker registered for offline asset caching
