const User = require("../../models/User");
const express = require('express');

const addUserDetailsController = async (req, res) => {
  const { _id } = req.user;
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, 
      { $set: req.body},
      {
        new: true,
        runValidators: true,
      }
    )

    if(!updatedUser){
      console.log('Failed to update User Profile ');
      return res.status(400).json({ status:'Failed', message:"Failed to update user profile "});
    }

    console.log(updatedUser);
    return res.status(200).json({ status:'Success', message: updatedUser });

  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error });
  }
};

module.exports = addUserDetailsController;
