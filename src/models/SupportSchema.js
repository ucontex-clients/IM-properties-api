const mongoose = require('mongoose');
const User = require('./User');

const SupportSchema = new mongoose.Schema({
    User: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },

    email: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    }
},
    { timestamps: true }
);

const Support = mongoose.model('Booking', SupportSchema);

module.exports = Support;