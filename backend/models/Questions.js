const mongoose = require('mongoose');

const model = mongoose.Schema({
    Tittle: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    }, 
    Author: {
        type: Object,
        require: true
    },
    Timestamp: { 
        type: String,
        require: true
    },
    Votes: {
        type: Array,
        defualt: []
    },
    Replies: {
        type: Array,
        default: []
    },
    Tags: {
        type: Array,
        default: []
    },
    Views: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Questions", model);