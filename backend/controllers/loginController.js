const { loginMod, loginJoi } = require('../models/loginModel')
const { signupMod } = require('../models/signupModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const login = async (req, res) => {
    const newData = new loginMod({
        email: req.body.email,
        password: req.body.password
    });

    const { email, password } = req.body;
    const { error } = loginJoi.validate(newData, { allowUnknown: true });

    if (error) {
        return res.status(400).json({
            isSuccess: false,
            msg: error.details[0].message
        });
    }

    try {
        const user = await signupMod.findOne({ email });

        if (!user) {
            return res.status(404).json({
                isSuccess: false,
                msg: "User not found"
            });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                isSuccess: false,
                msg: "Incorrect password"
            });
        }

        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            isSuccess: true,
            id: user._id,
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            isSuccess: false,
            msg: "Something went wrong"
        });
    }
};

module.exports = { login }