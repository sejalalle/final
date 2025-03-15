const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['visitor', 'user'], default: 'user' },
});

module.exports = mongoose.model('User', userSchema);