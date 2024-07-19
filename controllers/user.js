const User = require('../models/userModel');

class userController {
    static async update(req, res) {
        try 
        {
            const user = await (await User.findByIdAndUpdate(req.params.id, req.body, { new: true })).save();
            res.status(200).json({
                message: "User Updated Successfully!",
                user: user,
            })
        } catch (error) {
                res.status(500).json("Internal Server Error");
            }
    }
    static async delete(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "User Deleted Successfully!",
                user: user
            });
        } catch (error) {
                res.status(500).json("Internal Server Error");
        }
    }
    static async getUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json({ user });
        } catch (error) {
            console.error('Get User Error:', error.message);
            res.status(500).json("Internal Server Error");
        }
    }
    static async getUsers(req, res) {
        const query = req.query.new;
        try {
            const users = query? await User.find().sort({_id: -1}).limit(5) : await User.find();
            res.status(200).json({ users });
        } catch (error) {
            console.error('Get User Error:', error.message);
            res.status(500).json("Internal Server Error");
        }
    }
    static async getStats(req, res) {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        try {
            const data = await User.aggregate([
                {$match: {createdAt: {$gte: lastYear} } },
                {$project: { month: {$month: "$createdAt"}}},
                { $group: { _id: "$month", total: {$sum: 1}}}
            ]);
            res.status(200).json( {data});
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = userController;