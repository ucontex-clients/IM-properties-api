const express = require('express');
const Review = require('../../models/ReviewSchema');
const Property = require('../../models/PropertySchema');
const moment = require('moment');
exports.createReview = async (req, res) => {
  const id = req.params.id;
  console.log(req.user)
  const user = req.user;

  console.log(user);
  
  try {
    const { message } = req.body;

    const newReview = await Review.create({
       message, 
       user,
       createdAt: moment()
     });
    if(!newReview){
      console.log('No review');
      return res.status(400).json("could not create review");
    }

    const r = newReview._id;

    const updatedprops = await Property.findByIdAndUpdate(id,{
          $push:{
            reviews: newReview._id
          }
        })
      const data = {
        review: r,
        message: newReview.message,
        createdBy: user.username,
        createdAt: newReview.createdAt
      };

    console.log(data);
    return res.status(200).json( data);
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status:"failed", message: error.message });
  }
};

exports.delete = async(req, res) => {
  let id = req.params.id;
  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if(!deletedReview){
      console.log('Could not delete Review');
      return res.status(400).json("Could not delete review");
    }

    console.log('Review successfully deleted');
    return res.status(200).json("Review successfully deleted");

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status:"failed", message: error.message });
  }
};

exports.edit = async(req, res) => {
  const id = req.params.id;
  try {
    const edit = await Review.findByIdAndUpdate(id,{
      message: req.body.message
    },
    {
      new: true,
      runValidators: true
    });

    if(!edit){
      console.log('Failed to edit review');
      return res.status(400).json('Failed to edit review');
    }

    console.log(edit);
    return res.status(200).json(edit);
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status:"failed", message: error.message });
  }
};

exports.videoReview = async(req, res)=> {
  const file = req.file;
  try {
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status:"failed", message: error.message });
  }
}