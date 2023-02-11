const express = require('express');
const User = require('../../models/User');
const moment = require('moment');
const Booking = require('../../models/BookingSchema');

exports.cancelBooking = async (req, res) => {
  try {
    let id = req.user_id;
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id); 
    if(!deletedBooking) {
      console.log('Failed to cancel booking');
      return res.status(404).json({status:'Failed', message:'Failed to cancel booking' });
      };
    
      await User.findByIdAndDelete(req.params.id);
      console.log('Booking Cancelled, please reschedule');
      return res.status(200).json({status:'Success', message:'Booking Cancelled, please reschedule'});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error });
  }
}