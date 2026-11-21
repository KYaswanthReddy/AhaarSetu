const express = require('express');
const router = express.Router();
const Batch = require('../schemas/batchPassport');

// Bulk sync endpoint for offline IndexedDB queue
router.post('/batches', async (req, res) => {
  try {
    const { batches } = req.body;
    if (!Array.isArray(batches) || batches.length === 0) {
      return res.status(400).json({ success: false, error: 'Expected non-empty array of batches' });
    }

    const results = [];
    for (const b of batches) {
      const synced = await Batch.findOneAndUpdate(
        { batchId: b.batchId },
        { ...b, syncStatus: 'synced', lastSyncedAt: new Date() },
        { upsert: true, new: true }
      );
      results.push(synced.batchId);
    }

    res.json({
      success: true,
      syncedCount: results.length,
      syncedBatchIds: results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
