const Order = require('../models/orderModel');

class orderController {
    static async create(req, res) {
        try 
        {
            const newOrder = await (new Order(req.body)).save();
            res.status(200).json({
                message: "Order Created Successfully!",
                order: newOrder,
            })
        } catch (error) {
                res.status(500).json("Internal Server Error");
            }
    }
    static async update(req, res) {
        try {
            const order = await (await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})).save();
            res.status(200).json({
                message: "Order Updated Successfully!",
                order: order
            });
        } catch (error) {
                res.status(500).json("Internal Server Error");
        }
    }
    static async delete(req, res) {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "Order Deleted Successfully!",
                order: order
            });
        } catch (error) {
                res.status(500).json("Internal Server Error");
        }
    }
    static async getUserOrders(req, res) {
        try {
            const orders = await Order.find({ userId: req.params.userId });
            res.status(200).json({ orders });
        } catch (error) {
            console.error('Get Order Error:', error.message);
            res.status(500).json("Internal Server Error");
        }
    }
    static async getOrders(req, res) {
        try {
            const orders = await Order.find();
            res.status(200).json({ orders });
        } catch (error) {
            console.error('Get Orders Error:', error.message);
            res.status(500).json("Internal Server Error");
        }
    }
    static async getIncome(req, res) {
        const month = parseInt(req.query.month);
        const year = parseInt(req.query.year);

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0)
        try {
            const income = await Order.aggregate([
                { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
                { $group: { _id: month, totalIncome: { $sum: "$amount" } } }
            ]);
            res.status(200).json({ income });
        } catch (error) {
            console.error('Get income Error:', error.message);
            res.status(500).json("Internal Server Error");
        }
    }
}
module.exports = orderController;