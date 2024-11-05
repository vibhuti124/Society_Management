const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  unitNo: { type: String, required: true },
  wing: { type: String, required: true },
  unitStatus: { type: String, enum: ['Occupied', 'Vacant'], required: true },
  residentStatus: { type: String, enum: ['Owner', 'Tenant'], required: true },
  members: [{ type: String }],
  vehicles: [{ type: String }],
  ownerFullName: { type: String },
  ownerPhone: { type: String },
  ownerAddress: { type: String },
  aadharCardFront: { type: String },
  aadharCardBack: { type: String },
  addressProof: { type: String },
  rentAgreement: { type: String },
  society: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
});

module.exports = mongoose.model('Tenant', TenantSchema);