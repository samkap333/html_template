const mongoose = require('mongoose');

const OtpModelSchema = new mongoose.Schema({
 phoneNumber: { type: Number, required: true, unique:true },
  otp: { type: Number, required: true },
 timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OtpModel', OtpModelSchema);
