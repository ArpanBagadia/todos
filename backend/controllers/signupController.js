const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const { signupMod, signupJoi } = require('../models/signupModel')
require("dotenv").config()

let otpStore = {}

const signup = async (req, res) => {
    const { name, email, password } = req.body; 
    let userData = new signupMod({ name, email, password });
    const { error, value } = signupJoi.validate(userData, { allowUnknown: true })
    if (!error) {
        const userExits = await signupMod.findOne({ email });
        if (userExits) return res.status(400).json({ message: "User already exists" });
        const otp = Math.floor(100000 + Math.random() * 900000);
        otpStore[email] = { otp, name, password, createAt: Date.now() };
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,     
                pass: process.env.EMAIL_PASS 
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return res.status(500).json({ message: "Failed to send email" });
            return res.json({ message: "OTP sent", email });
        });
    }
    else {
        return res.status(400).json({ message: "Validation error", error: error.details });
    }
}

const verify = async (req, res) => {
    const { email, otp } = req.body;
    const record = otpStore[email];

    if (!record) {
        return res.status(400).json({
            msg: "no otp found for this email"
        })
    }

    if (parseInt(otp) !== record.otp) {
        return res.status(400).json({
            msg: "Invalid otp"
        })
    }

    const currentTime = Date.now()
    const otpTime = record.createAt
    if (currentTime - otpTime > 2 * 60 * 1000) {
        delete otpStore[email]
        return res.status(400).json({
            msg: "OTP expired"
        })
    }

    const hashedPassword = await bcrypt.hash(record.password, 10)
    const newUser = new signupMod({
        name: record.name,
        email: email,
        password: hashedPassword,
        verified:true
    })
    await newUser.save()
    delete otpStore[email]

    return res.json({
        msg: "user registered successfully!"
    })
}

module.exports = { signup, verify }