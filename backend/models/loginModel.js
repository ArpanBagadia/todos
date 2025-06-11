const mongoose = require('mongoose')
const Joi = require('joi')

const loginModel = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const loginJoi = Joi.object({
    email: Joi.string().email(),
    password: Joi.string()
})

let loginMod = mongoose.model("loginModel", loginModel)

module.exports = { loginMod, loginJoi }