const mongoose = require('mongoose');
const User = require('./User');
const Property = require('./PropertySchema');

const BookingSchema = new mongoose.Schema({
  User: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true
  },

  Property: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Property",
    required: true
  },

  time: {
    type: String,
    enum: ['10am', '1pm'],
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
    required: true
  }
},
{ timestamps: true }
);

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;