const User = require("../../models/User");
const express = require('express');
const cloudinary = require('../../config/cloudinary2');

const userProfile = async(req, res) => {
  const data = {
    firstname,
    lastname,
    gender,
    country,
    state,
    city,
    lga,
    phone1,
    phone2,
    date_of_birth,
    occupation,
    address,
  } = req.body;

  const kinData = {
    nextofkin,
    kin_phone,
    kin_address
  } = req.body;

  data.kin = kinData;

  console.log('==================================================files');
  console.log(files);

  try {
    const files =req.files;
    if(files && files.length < 1) {
      console.log("Upload ID and Photo")
      return res.status(401).json({ error:{ message: "Upload ID and Photo"}})
    };


    const result = await files.map(async (file) => {
      return await cloudinary.uploader.upload(file.path);
    });

    console.log('==================================================results');
    console.log(files);



    const imageUrl = await Promise.all(results);
    data.pictureupload = imageUrl[0];
    data.idupload = imageUrl[1];

    const user = await User.findByIdAndUpdate(user._id, 
      { data }, { new: true });

    if(!user){
      console.log("Failed to update user")
      return res.status(401).json({ error:{ message: "Failed to update user"}})
    };

    console.log(user);
    return res.status(200).json({ status:'failed', message: user });
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status:'failed', message: error.message})
  }
};

module.exports = userProfile;