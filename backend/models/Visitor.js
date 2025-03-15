const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    srNo: { type: String, required: true, unique: true }, // Added srNo field
    visitorName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    phone: { type: String, required: true },
    purpose: { type: String, required: true },
    photo: { type: String }, // Path to photo if uploaded
    checkInTime: { type: Date }, // Ensure it's a full Date object
    checkOutTime: { type: Date },
    department: { type: String, required: true },
    contactPerson: { type: String, required: true },
    idNumber: { type: String, required: true },
    count: { type: Number, default: 0 },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
});

module.exports = mongoose.model('Visitor', VisitorSchema);