const Product = require('../models/productModel');

class productController {
    static async create(req, res) {
        try 
        {
            const newProduct = await (new Product(req.body)).save();
            res.status(200).json({
                message: "Product Created Successfully!",
                product: newProduct,
            })
        } catch (error) {
                res.status(500).json("Internal Server Error");
            }
    }
    static async update(req, res) {
        try {
            const product = await (await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})).save();
            res.status(200).json({
                message: "Product Updated Successfully!",
                product: product
            });
        } catch (error) {
                res.status(500).json("Internal Server Error");
        }
    }
    static async delete(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "Cart Deleted Successfully!",
                product: product
            });
        } catch (error) {
                res.status(500).json("Internal Server Error");
        }
    }
    static async getProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json({ product });
        } catch (error) {
            console.error('Get Product Error:', error.message);
            res.status(500).json("Internal Server Error");
        }
    }
    static async getProducts(req, res) {
        const queryNew = req.query.new;
        const queryCategory = req.query.category;
        try {
            const products = queryNew? await Product.find().sort({createdAt: -1}).limit(1) 
            : queryCategory? await Product.find({
                category: {
                    $in: [queryCategory],
                },
            })
            : await Product.find();
            res.status(200).json({ products });
        } catch (error) {
            console.error('Get Product Error:', error.message);
            res.status(500).json("Internal Server Error");
        }
    }
}
module.exports = productController;