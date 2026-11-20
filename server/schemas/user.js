const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  businessName: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  fssaiNumber: { type: String, default: null },
  fssaiTier: { 
    type: String, 
    enum: ['Basic_Registration', 'State_License', 'Central_License', 'None'], 
    default: 'None' 
  },
  annualTurnoverLakhs: { type: Number, default: 0 },
  preferredLanguage: { type: String, default: 'te' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
