const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt'); 

const { createToken } = require('../middleware/authMid');
const { verifyToken } = require('../middleware/authMid');
const { createRefreshToken } = require('../middleware/authMid');

class Auth {
    static async register(req, res) {
        const newUser = new User ({
            username: req.body.username, 
            email: req.body.email,
            password: req.body.password,
            // isAdmin: req.body.isAdmin
        });
        try {
            const user = await newUser.save();
            console.log("Sucess!" + user);
            res.status(201).json(user);
            //res.send(`User Registered Successfully, your username is ${newUser.username}`)
        }  catch (error) {
            //console.log(error.message);
            res.status(500).json(error.message);
            }
        };
    static async login(req, res) {
        const { username, email, password } = req.body;
        try {
            const user = await User.findOne({username, email});
            if (user) {
                if ( await bcrypt.compare(password, user.password))
                {
                    const accessToken = createToken(user._id);
                    const refreshToken = createRefreshToken(user._id);
                    res.cookie('accessToken', accessToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 60 * 60 * 1000 // 1 hour
                    });
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    });
                    console.log("User logged in successfully!");
                    res.status(200).json({username, email, accessToken, refreshToken });
                    console.log(req.cookies);
                }
            } else {
                res.send(400).json("User Not Found");
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
    static async refresh(req, res) {
        if (req.cookies.refreshToken) {
            try {
                const decodedToken = await verifyToken(refreshToken);
                const accessToken = createToken(req.userId);
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 1000 // 1 hour
                });
                return res.json({ accessToken });
            } catch (error) {
                return res.status(406).json({ message: 'Unauthorized' });
            }
        }
    }
    static async logout(req, res){
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json("User logged out");
    }

}

module.exports = Auth;