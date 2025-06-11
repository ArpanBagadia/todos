const mongoose = require('mongoose')
const Joi = require('joi')

const signupModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const signupJoi = Joi.object({
    name: Joi.string().alphanum().min(3).max(10),
    email: Joi.string(),
    password: Joi.string()
})

let signupMod = mongoose.model("signup", signupModel)

module.exports = { signupMod, signupJoi }
