const express = require('express');
const router = express.Router();
const Product = require('../schemas/product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ updatedAt: -1 });
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
