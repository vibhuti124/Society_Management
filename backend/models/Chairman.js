const mongoose = require('mongoose');

const ChairmanSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  society: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['admin', 'resident', 'security'],
    default: 'admin'
  },
  otp: {
    type: String,
  },
  otpExpiration: {
    type: Date,
    default: Date.now,
    get: (otpExpiration) => otpExpiration.getTime(),
    set: (otpExpiration) => new Date(otpExpiration)
  }

},
  { timestamps: true })


module.exports = mongoose.model('Chairman', ChairmanSchema);