const express = require('express');
const User = require('../../models/User');
const moment = require('moment');
const Booking = require('../../models/BookingSchema');


exports.createBooking = async (req, res) => {
  try {
    let {_id} = req.user;
    let now = moment()

    const { time, date, location } = req.body;
    if(now > moment(date)) {
      console.log('Invalid Date, can not book a past date');
      return res.status(404).json('Invalid Date, can not book a past date');
    };

    const booking = await Booking.create({
      user: _id,
      time,
      date,
      location,
      status: 'pending'
     });
    
    if(!booking) {
    console.log('Failed to create booking');
    return res.status(404).json({status:'Failed', message:'Failed to create booking' });
    };

    console.log(booking);
    return res.status(200).json({status:'Success', message:booking });
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error });
  }
}


