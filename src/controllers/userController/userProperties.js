const express = require('express');
const Transaction = require('../../models/TransactionSchema');
const Property = require('../../models/PropertySchema');

exports.userProperty = async(req, res) => {
  let user = req.user;
  try {
    const properties  = await Transaction.find({
      Payer: user._id
    });

    if(!properties){
      console.log('No properties for this user');
      return res.status(404).json({ status:'failed', message:'No properties for this user'});
    }

    console.log(properties);
    return res.status(200).json({ status:'success', message:properties });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}