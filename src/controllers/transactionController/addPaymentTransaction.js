const express = require('express');
const Payment = require('../../models/PaymentSchema');
const Property = require("../../models/PropertySchema.js")
const User = require('../../models/User')
const axios = require('axios');
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const { FLUTTERWAVE_SECRET_KEY, FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_ENCRYPTION_KEY } = require('../../config/constant');
const Transaction = require('../../models/TransactionSchema');
const moment = require('moment');
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_SECRET_KEY);

exports.response =  async(req, res) => {
  const {_id} = req.user;
  const property = await Property.find(req.params.property);
  try {
    const{ transaction_id } = req.query;
    const { paymentMode, duration } = req.body;
    // URL with the Transaction_ID sent from the frontend to Verify transaction
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    // Making an API call with Axios to verify Transaction
    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${FLUTTERWAVE_SECRET_KEY}`,
      },
    });

    const flutter = response.data.data;

    // Create a Transaction using the Transaction model 
    const data = {
      payer: _id,
      property,
      amount: flutter.amount,
      paymentMethod: "flutterwave",
      currency: flutter.currency,
      status: flutter.status
    };
    // Saving the Transaction in the Database
    const transaction = await Transaction.create(data);


    // Check if this is a first time payment for this property or not
    const payment = await Payment.findOne(property).populate('property');
    if(payment) {
      payment.Payer = _id
      payment.amount= parseFloat((property.width * property.length) * property.pricePerSm);
      payment.mode = paymentMode;
      payment.paid += flutter.amount;
      payment.balance = payment.amount - payment.paid;
      payment.duration = duration;
      payment.nextPayment = moment().add(1, 'M');
      payment.transactions = payment.transactions.push(transaction._id)
      await payment.save();
      console.log(payment);
      return res.status(200).json(payment);
    }

    const paymentData = {
      amount: parseFloat((property.width * property.length) * property.pricePerSm),
      mode: paymentMode,
      paid: flutter.amount,
      balance: amount - paid,
      duration : duration,
      transactions: transaction._id,
      nextPayment: moment().add(1, 'M'),
      property: property._id,
    };

    const newPayment = await Payment.create(paymentData);

    if(newPayment) {
      console.log(newPayment);
      return res.status(200).json(newPayment);
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}
