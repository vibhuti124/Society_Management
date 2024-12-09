const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    billFormat: { type: String, required: true }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } ,// To track user who created it
    
    Society: { type: mongoose.Schema.Types.ObjectId, ref: 'Society' }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
