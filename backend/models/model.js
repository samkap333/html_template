const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  phoneNumber: { type: Number, required: true , unique:true},
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    unique: false,
    set: function(password) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt)
      return hash;
    }
  },
  userType: { type: String, enum: ['admin', 'user'], default: 'admin' },

 // authenticated: { type: Boolean, default: false }
});

module.exports = mongoose.model("Database", userSchema);
