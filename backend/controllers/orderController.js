const Order = require("../models/Order");

// 📌 Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { items, totalPrice, status = "Pending" } = req.body;

        if (!items || items.length === 0 || !totalPrice) {
            return res.status(400).json({ success: false, message: "Items and totalPrice are required." });
        }

        const newOrder = new Order({ items, totalPrice, status });
        const savedOrder = await newOrder.save();

        res.status(201).json({ success: true, order: savedOrder });
    } catch (error) {
        console.error("Order Creation Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// 📌 Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Fetching Orders Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// 📌 Get a single order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Fetching Single Order Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// 📌 Update order status (e.g., after successful payment)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required." });
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, order: updatedOrder });
    } catch (error) {
        console.error("Updating Order Status Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// 📌 Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order deleted successfully." });
    } catch (error) {
        console.error("Deleting Order Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
