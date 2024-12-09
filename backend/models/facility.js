const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    scheduleServiceDate: { type: Date, required: true },
    remindBeforeDays: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Society: { type: mongoose.Schema.Types.ObjectId, ref: 'Society' }
}, { timestamps: true });

module.exports = mongoose.model('Facility', FacilitySchema);
