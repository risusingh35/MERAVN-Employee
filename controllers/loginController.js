const loginService = require('../services/loginService');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();
// POST /login
// Find User is existing by Email  ID
exports.login = async (req, res) => {
    try {
        const secretKey = process.env.JWT_SECRET;
        const email = req.body.email
        const password = req.body.password
        const user = await loginService.getUserByEmail(email)
        if (!user) {
            return res.status(200).json({ message: 'Invalid credentials/user' });
        }
        // Compare the provided password with the hashed password in the database
        const passwordMatch = password === user.password
        if (!passwordMatch) {
            return res.status(200).json({ message: 'Invalid credentials/password' });
        }
        // If authentication is successful, generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
        res.json({roleId:user.roleId.name ,email: user.email ,name:user.name,token});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};