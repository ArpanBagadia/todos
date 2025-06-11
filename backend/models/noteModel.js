const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'loginModel',
        required: true
    }
})

module.exports = mongoose.model("Note", noteSchema)