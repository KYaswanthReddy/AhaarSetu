require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/batches', require('./routes/batches'));
app.use('/api/products', require('./routes/products'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'AhaarSetu API' }));

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`AhaarSetu API running on port ${PORT}`)))
  .catch(err => console.error('MongoDB connection error:', err));
