const mongoose = require('mongoose');

const SocietySchema = new mongoose.Schema({
    societyName: { type: String, required: true },
    societyAddress: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true }
});

module.exports = mongoose.model('Society', SocietySchema);
