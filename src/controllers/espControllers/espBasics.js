const express = require('express');
const User = require('../../models/User');
const Esp = require('../../models/EspSchema');
const { generateReferall } = require('../../utils/randomString');

exports.switchToEsp = async(req, res) => {
  console.log(req.user);

  try {
    if(req.user.role === 'ESP'){
      console.log('This user is already an ESP');
      return res.status(401).json({status:'failed', message:'This user is already an ESP'});
    }

    const user = await User.findByIdAndUpdate(req.user._id, {
      role: 'ESP'
    },
    { new: true});

    const referralCode = generateReferall();
    const alreadyTaken = await Esp.findOne({
      referralId: referralCode
    });
    
    if(alreadyTaken) {
      generateReferral()
    };

    console.log(referralCode);

    const esp = await Esp.create({
      user: req.user._id,
      referer: req.user.referer,
      referralId: referralCode 
    });

    if(!esp) {
      console.log('Could not create ESP');
      return res.status(404).json({ status: 'failed', message: 'Could not create ESP'});
    }

    const data = {
      name: req.user.username,
      referral_ID: esp.referralId,
      level: esp.level,
      network: esp.network,
      downlines: esp.networkDownline,
      balance: esp.commisionBalance
    };

    console.log(data);
    return res.status(200).json({ status: 'success', message: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status:'failed', message: error.message })
  }
}

exports.getProperties = async(req, res) => {
  try{
    
  }
  catch{
    console.log(error.message);
    return res.status(500).json({ status:'failed', message: error.message })
  }
}