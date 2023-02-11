const express = require('express');
const Booking = require('../../models/BookingSchema');
const Property = require('../../models/PropertySchema');

exports.getUserBooking = async(req, res) => {
  try {
    const booking = await Booking.find({ User: req.user._id }).populate({path: 'Property', select: 'name'});
    if(!booking || booking == []){
      console.log('No booking for User');
      return res.status(404).json('No booking for user');
    }

    const data = booking.map(book => {
      return {
        ID : book._id,
        User: req.user.username,
        Property: book.Property.name,
        Time: book.time,
        Date: book.date,
        Location: book.location,
        Status: book.status
      } 
    });

    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
};

exports.getPropertyBooking =  async(req, res) => {
  try {
    const booking = await Booking.find({ Property: req.params.id }).populate('Property', 'name').populate('User','username');
    if(!booking){
      console.log('No booking for property');
      return res.status(404).json('No booking for property');
    }

    const data = booking.map(book => {
      return {
        ID : book._id,
        User: book.User.username,
        Property: book.Property.name,
        Time: book.time,
        Date: book.date,
        Location: book.location,
        Status: book.status
      } 
    });

      console.log(data);
      return res.status(404).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json(error.message);
  }
};