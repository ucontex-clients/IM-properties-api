const express = require('express');
const User = require('../../models/User');
const moment = require('moment');
const Booking = require('../../models/BookingSchema');

exports.reschedule = async(req, res) => {
  const id = req.user._id;
  let now = moment();
  try {
    if(now > moment(req.body.date)){
      console.log('Invalid Date, can not book a past date');
      return res.status(400).json('Invalid Date, can not book a past date')
    };

    const message = req.body;
    property = req.params.id;

    const rescheduledBooking = await Booking.findOneAndUpdate(
      {id:req.params.id, User: id },
      { id, property, ...req.body },
      { new: true, runValidators: true }
    );

    if(!rescheduledBooking){
      console.log('Could not reschedule booking ');
      return res.status(400).json({ status:'Failed', message:"Could not reschedule booking "});
    }

    console.log(rescheduledBooking);
    return res.status(200).json({ status:'Success', message: rescheduledBooking });
    
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error }); 
  }
}