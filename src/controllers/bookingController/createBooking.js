const express = require('express');
const User = require('../../models/User');
const moment = require('moment');
const Booking = require('../../models/BookingSchema');
const Property = require('../../models/PropertySchema');


exports.createBooking = async (req, res) => {
  try {
    let user = req.user;
    let now = moment()

    const { time, date, location,  } = req.body;
    if(now > moment(date)) {
      console.log('Invalid Date, can not book a past date');
      return res.status(404).json('Invalid Date, can not book a past date');
    };

    const property = await Property.findById(req.params.id);
    console.log(property);

    const booking = await Booking.create({
      User: user._id,
      time,
      date,
      location,
      status: 'pending',
      Property: req.params.id
     });
    
    if(!booking) {
    console.log('Failed to create booking');
    return res.status(404).json({status:'Failed', message:'Failed to create booking' });
    };

    const data = {
      userId: user._id,
      userName: user.username,
      time: booking.time,
      date: booking.date,
      location: booking.location,
      propertyID: property._id,
      propertyName: property.name
    };

    console.log(data);
    return res.status(200).json({status:'Success', message:data });
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error });
  }
}


