const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResidentOwner' },
    tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResidentTenant' },
    maintenanceAmount: { type: Number, required: true },
    penaltyAmount: { type: Number, default: 0 },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Complete'], default: 'Pending' },
    paymentMethod: { type: String, enum: ['Cash', 'Online'], default: 'Online' },
    lastDate: { type: Date },
    penaltyAppliedAfterDays: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Society: { type: mongoose.Schema.Types.ObjectId, ref: 'Society' }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
