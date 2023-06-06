const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Social', socialSchema);
