const mongoose = require('mongoose');

const visitorLogSchema = new mongoose.Schema({
    visitorName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    date: { type: Date, required: true },
    unitNumber: { type: String, required: true },
    time: { type: String, required: true }, createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      Society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society'
      }

});

module.exports = mongoose.model('VisitorLog', visitorLogSchema);
