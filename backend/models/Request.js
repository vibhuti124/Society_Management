const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requesterName: { type: String, required: true },
    requestName: { type: String, required: true },
    description: { type: String, required: true },
    requestDate: { type: Date, required: true },
    wing: { type: String, required: true },
    unit: { type: String, required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
    status: { type: String, enum: ['Open', 'Pending', 'Solve'], required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Society: { type: mongoose.Schema.Types.ObjectId, ref: 'Society' }
}, {timestamps: true});

module.exports = mongoose.model('Request', requestSchema);
