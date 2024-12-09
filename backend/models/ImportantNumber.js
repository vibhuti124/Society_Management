const mongoose = require('mongoose');

const ImportantNumberSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    Society: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Society' 
        }
}, { timestamps: true });

module.exports = mongoose.model('ImportantNumber', ImportantNumberSchema);
