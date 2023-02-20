const User = require("../../models/User");
const express = require('express');
const cloudinary = require('../../config/cloudinary2');
const fs = require('fs');

const userProfile = async(req, res, next) => {
  const data = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    lga: req.body.lga,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    date_of_birth: req.body.date_of_birth,
    occupation: req.body.occupation,
    address: req.body.address,
  }

  const kinData = {
    nextofkin: req.body.nextofkin,
    kin_phone: req.body.kin_phone,
    kin_address: req.body.kin_address
  }

  data.kin = kinData;

  try {
    const files = req.files;
    console.log(files);
    if(files && files.length < 1) {
      return res.status(401).json({
      error: { message: "At least one image must be uploaded" }}) 
    }

    const imagesURLs = [];
    

    const results = await Promise.all(files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);
      fs.unlink(file.path, (err) => {
        if (err) throw err;
        console.log(`${file.path} was deleted`);
      });
      return result;
    }));

   const newArr = await Promise.all(results);
   newArr.forEach( arr => {
    imagesURLs.push(arr.secure_url)
   });

    data.pictureupload = imagesURLs[0];
    data.idupload = imagesURLs[1];

    console.log(data);

    const user = await User.findByIdAndUpdate(req.user._id, data, { new: true });

    if(!user){
      console.log("Failed to update user")
      return res.status(401).json({ error:{ message: "Failed to update user"}})
    };

    console.log(user);
    return res.status(200).json({ status:'success', message: user });
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status:'failed', message: error.message})
  }
};

module.exports = userProfile;