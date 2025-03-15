const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    items: [
        {
            shape: String,
            quantity: Number,
            material: String,
            description: { type: String, required: false } // ✅ Make it optional
        }
    ],
    totalPrice: Number,
    status: { type: String, default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
