const express = require('express');
const router = express.Router();
const User = require('../schemas/user');

// GET user profile by phone
router.get('/:phone', async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.params.phone });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CREATE or UPDATE profile
router.post('/register', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOneAndUpdate(
      { phoneNumber },
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
