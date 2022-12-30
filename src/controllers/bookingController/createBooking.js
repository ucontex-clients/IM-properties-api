const express = require('express');
const User = require('../../models/User');
const moment = require('moment');
const Booking = require('../../models/BookingSchema');
const Property = require('../../models/PropertySchema');

exports.createBooking = async(req, res) => {
  try {
    const user = req.user;
    let now = moment()
    const { time, date, location } = req.body;

    // Checking Date
    if(now > moment(date)) {
     console.log('Invalid Date, can not book a past date');
     return res.status(404).json('Invalid Date, can not book a past date');
    }

    // Getting Property
    const property = await Property.findById(req.params.id);
    if(!property) {
      console.log('wrong property');
      return res.status(400).json({ status:'failed', message: 'wrong property'})
    }

    // Creating Booking
    const booking = await Booking.create({
      User: user._id,
      Property: property._id,
      time,
      date,
      location
    });

    if(!booking){
      console.log('Could not create booking');
      return res.status(400).json({ status:'failed', message: 'Could not create booking'})
    }

    const data = {
      Booking: booking._id,
      userId: user._id,
      userName: user.username,
      time: booking.time,
      date: booking.date,
      location: booking.location,
      propertyID: property._id,
      propertyName: property.name
    };

    console.log(data);
    return res.status(200).json({ status:'success', message: data});
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status:'failed', message:error.message})
  }
}

