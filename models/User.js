const express = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true } 
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model("User", userSchema);