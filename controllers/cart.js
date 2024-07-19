const Cart = require('../models/cartModel');

class cartController {
    static async create(req, res) {
        try 
        {
            const newCart = await (new Cart(req.body)).save();
            res.status(200).json({
                message: "Cart Created Successfully!",
                cart: newCart,
            })
        } catch (error) {
                res.status(500).json("Internal Server Error");
            }
    }
    static async update(req, res) {
        try {
            const cart = await (await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true})).save();
            res.status(200).json({
                message: "Cart Updated Successfully!",
                cart: cart
            });
        } catch (error) {
                res.status(500).json("Internal Server Error");
        }
    }
    static async delete(req, res) {
        try {
            const cart = await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "Cart Deleted Successfully!",
                cart: cart
            });
        } catch (error) {
                res.status(500).json("Internal Server Error");
        }
    }
    static async getUserCart(req, res) {
        try {
            const cart = await Cart.find({ userId: req.params.userId });
            res.status(200).json({ cart });
        } catch (error) {
            console.error('Get Cart Error:', error.message);
            res.status(500).json("Internal Server Error");
        }
    }
    static async getCarts(req, res) {
        try {
            const carts = await Cart.find();
            res.status(200).json({ carts });
        } catch (error) {
            console.error('Get Carts Error:', error.message);
            res.status(500).json("Internal Server Error");
        }
    }
}
module.exports = cartController;