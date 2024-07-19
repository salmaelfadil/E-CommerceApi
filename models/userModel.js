const mongoose = require("mongoose");
const { isEmail } = require('validator');
const bcrypt = require('bcrypt'); 
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: function () {
                return new ObjectId().toString()
            }
        },
        username: { 
            type: String, 
            required: true,
            unique: true,
           
        }, 
        email: {
            type: String,
            required: true,
            unique: true,
             //  validate: [isEmail, 'Please enter a valid email']
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'Minimum length is 6 characters']
        },
        isAdmin: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true}
);

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
module.exports = mongoose.model("User", UserSchema);