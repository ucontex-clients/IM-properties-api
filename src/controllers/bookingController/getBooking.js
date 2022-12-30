const express = require('express');
const Booking = require('../../models/BookingSchema');
const Property = require('../../models/PropertySchema');

exports.getUserBooking = async(req, res) => {
  try {
    const booking = await Booking.find({ User: req.user._id });
    if(!booking || booking == []){
      console.log('No booking for User');
      return res.status(404).json('No booking for user');
    }
      console.log(booking);
      return res.status(404).json(booking);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
};

exports.getPropertyBooking =  async(req, res) => {
  try {
    const booking = await Booking.find({ Property: req.params.id });
    if(!booking){
      console.log('No booking for property');
      return res.status(404).json('No booking for property');
    }
      console.log(booking);
      return res.status(404).json(booking);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
};