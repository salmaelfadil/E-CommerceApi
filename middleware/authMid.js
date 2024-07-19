const { create } = require("../models/userModel");
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { verify } = require('crypto');
const { json } = require('body-parser');

function createToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
}

function createRefreshToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' }); 
}
// returns a decoded token 
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

const authorizeRequest = async (req, res, next)  => {
    //console.log(req.cookies)
    const token = req.cookies.accessToken || req.headers.authorization.split(' ')[1];
    if (token) {
        try {
            const decodedToken = verifyToken(token);
            const user =  await User.findById(decodedToken.id);
            // console.log(admin);
            if (req.params.id == decodedToken.id || user.isAdmin) {
                req.userId = decodedToken.id;
                next();
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            if (error.message === 'TokenExpiredError')
                {
                    return res.status(401).json({ message: 'Token expired' });
                }
        }
    } else {
        return res.redirect('/login');
    }
}
const authorizeAdmin = async (req, res, next)  => {
    //console.log(req.cookies)
    const token = req.cookies.accessToken || req.headers.authorization.split(' ')[1];
    if (token) {
        try {
            const decodedToken = verifyToken(token);
            const user =  await User.findById(decodedToken.id);
            // console.log(admin);
            if (user.isAdmin) {
                req.userId = decodedToken.id;
                next();
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        } catch (error) {
            if (error.message === 'TokenExpiredError')
                {
                    return res.status(401).json({ message: 'Token expired' });
                }
        }
    } else {
        return res.redirect('/login');
    }
}

module.exports = { createToken, createRefreshToken, verifyToken, authorizeRequest, authorizeAdmin };