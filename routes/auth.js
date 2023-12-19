const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const errorHandler = (res,error)=>{
    console.error(error);
    res.status(500).json({
        error: error.message
    });
}

router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                error: "please provide all the required fields"
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                error: "User already exists"
            });
        }
        const ePass = await bcrypt.hash(password, 10);
        await User.create({ name, email, mobile, password: ePass });
        res.status(201).json({
            message: "User registered successfully"
        });
    } catch (error) {
        errorHandler(res,error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "please provide the details"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: "User not found"
            });
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(401).json({
                error: "Invalid password"
            });
        }
        const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRETKEY,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: "login Success",
            token,
        });
    } catch (error) {
        errorHandler(res,error);
    }
});

module.exports = router;