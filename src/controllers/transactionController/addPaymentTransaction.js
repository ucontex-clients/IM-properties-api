const express = require('express');
const Payment = require('../../models/PaymentSchema');
const Property = require("../../models/PropertySchema.js")
const User = require('../../models/User')
const Esp = require('../../models/EspSchema');
const axios = require('axios');
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const { FLUTTERWAVE_SECRET_KEY, FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_ENCRYPTION_KEY } = require('../../config/constant');
const Transaction = require('../../models/TransactionSchema');
const moment = require('moment');
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(FLUTTERWAVE_PUBLIC_KEY, FLUTTERWAVE_SECRET_KEY);
const ESP = require('../../models/EspSchema');
const { directDownlinePercentage, commissionFromDownline, balancePayment } = require('../../utils/paymentCalculations')
const request = require('request');
const { message } = require('../../utils/validatePropertiesSchema');


exports.addPayTransaction = async (req, res) => {
  try {
    const { user_id, mode, plots, duration, property_id, transaction_id, totalPrice } = req.body;
    const user = await User.findById(user_id);
    var url = 'https://api.flutterwave.com/v3/transactions/' + transaction_id + '/verify'

    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${FLUTTERWAVE_SECRET_KEY}`
      }
    });
    const flutter = response.data.data;
    if(mode === "outright"){
      const transactionData = {
        Payer: user_id,
        Property: property_id,
        flutterTransactionId: transaction_id,
        amount: flutter.amount,
        paymentMethod: 'flutterwave',
        plotLayout: plots,
        status: flutter.status,
        currency: flutter.currency
      };
      const transaction = await Transaction.create(transactionData);
      if (!transaction) {
        console.log('Failed to create Transaction');
        return res.status(401).json({ status: 'failed', message: 'Failed to create Transaction' });
      };
      const paymentData = {
        Payer: user_id,
        amount: totalPrice,
        mode: "outright",
        paid: flutter.amount,
        balance: 0,
        duration: "none",
        transactions: transaction_id,
        nextPayment: null,
        monthlyPayment: 0,
        plotLayout: plots,
        status: 'completed',
        property: property_id
      };
      const payment = await Payment.create(paymentData);
      if (!payment) {
        console.log('Failed to create Payment');
        return res.status(401).json({ status: 'failed', message: 'Failed to create Payment' });
      }
      else {
        Property.updateMany(
          { 'plotLayout._id': { $in: plots } },
          { $set: { "plotLayout.$[].status": "sold" } },
          { multi: true, arrayFilters: [{ "element._id": { $in: plots } }] }
        )
          .then(result => { console.log(result); })
          .catch(error => { console.error(error); });

        // Updating Referer Commision;
        const referer = await Esp.findOne(user.referer);
        if (referer) {
          const money = directDownlinePercentage(referer.status, payment.amount);
          referer.commisionBalance += money;
          await referer.save();
        }
        const downliners = referer.networkDownline;
        console.log(downliners);
        for (let downline of downliners) {
          if (downline === user._id) {
            const moneey = commissionFromDownline(referer.status, payment.amount);
            referer.commisionBalance += moneey;
            await referer.save();
          }
        }
      }
      console.log(payment);
      return res.status(200).json({ status: 'successful', message: payment });
    }
    if(mode === "installment"){
      const ifFirstPayment = await Payment.findOne({
        Payer: user_id,
        property: property_id
      });
      if(!ifFirstPayment){

        const transactionData = {
          Payer: user_id,
          Property: property_id,
          flutterTransactionId: transaction_id,
          amount: flutter.amount,
          paymentMethod: 'flutterwave',
          plotLayout: plots,
          status: flutter.status,
          currency: flutter.currency
        };

        const transaction = await Transaction.create(transactionData);
        if (!transaction) {
          console.log('Failed to create Transaction');
          return res.status(401).json({ status: 'failed', message: 'Failed to create Transaction' });
        };

        const result = balancePayment(duration, totalPrice, flutter.amount);

        // Creating Payment from the Payment Model:
        const paymentData = {
          Payer: user_id,
          amount: totalPrice,
          mode: "installment",
          paid: flutter.amount,
          balance: result.newTotalAmount,
          duration: duration,
          transactions: transaction._id,
          nextPayment: moment().add(1, 'M'),
          monthlyPayment: result.monthlyPayment,
          plotLayout: plots,
          status: 'ongoing',
          property: property_id
        };

        const payment = await Payment.create(paymentData);
        if (!payment) {
          console.log('Failed to create Payment');
          return res.status(401).json({ status: 'failed', message: 'Failed to create Payment' });
        };

        // Updating plot Layouts in Property
        Property.updateMany(
          { 'plotLayout._id': { $in: plots } },
          { $set: { "plotLayout.$[].status": "ongoingPayment" } },
          { multi: true, arrayFilters: [{ "element._id": { $in: plots } }] }
        )
          .then(result => { console.log(result); })
          .catch(error => { console.error(error); });

          return res.status(200).json({ status: "successful", message: payment});
      }
      else{
        const transactionData = {
          Payer: user_id,
          Property: property_id,
          flutterTransactionId: transaction_id,
          amount: flutter.amount,
          paymentMethod: 'flutterwave',
          plotLayout: plots,
          status: flutter.status,
          currency: flutter.currency
        };

        const transaction = await Transaction.create(transactionData);
        if (!transaction) {
          console.log('Failed to create Transaction');
          return res.status(401).json({ status: 'failed', message: 'Failed to create Transaction' });
        };

        ifFirstPayment.paid = ifFirstPayment.paid + flutter.amount;
        ifFirstPayment.balance = ifFirstPayment.paid - flutter.amount;
        ifFirstPayment.transactions = ifFirstPayment.transactions.push(transaction._id);
        if(ifFirstPayment.balance === 0){
          ifFirstPayment.nextPayment = null;
          ifFirstPayment.status = "completed"
        }
        else{
          ifFirstPayment.nextPayment = moment().add(1, 'M');
        }

        const updatedPayment = await ifFirstPayment.save();
        if (!updatedPayment) {
          console.log('Failed to update payment');
          return res.status(401).json({ status: 'failed', message: 'Failed to update payment' });
        }

        if(ifFirstPayment.balance === 0){
          Property.updateMany(
            { 'plotLayout._id': { $in: ifFirstPayment.plotLayout } },
            { $set: { "plotLayout.$[].status": "sold" } },
            { multi: true, arrayFilters: [{ "element._id": { $in: plots } }] }
          )
            .then(result => { console.log(result); })
            .catch(error => { console.error(error); });

          // Updating Referer Commision;
          const referer = await Esp.findOne(user.referer);
          if (referer) {
            const money = directDownlinePercentage(referer.status, ifFirstPayment.amount);
            referer.commisionBalance += money;
            await referer.save();
          }
          const downliners = referer.networkDownline;
          console.log(downliners);
          for (let downline of downliners) {
            if (downline === user._id) {
              const moneey = commissionFromDownline(referer.status, ifFirstPayment.amount);
              referer.commisionBalance += moneey;
              await referer.save();
            }
          }
        }
        console.log(ifFirstPayment);
        return res.status(200).json({ status: "successful", message: ifFirstPayment});

      }
    }

  }
  catch(error){
    console.log(error);
    return res.status(500).json({ status: "failed", message: error.message });
  }
}

exports.confirmPayment = async (req, res) => {

  try {
    const { transaction_id } = req.query;

    var transferId = transaction_id;
    var secretKey = FLUTTERWAVE_SECRET_KEY;
    var url = 'https://api.flutterwave.com/v3/transactions/'+transferId+'/verify'

    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${FLUTTERWAVE_SECRET_KEY}`
      }
    });

    /*var options = {
      url: 'https://api.flutterwave.com/v3/transactions/'+transferId+'/verify',
      headers: {
        'Authorization': 'Bearer ' + secretKey
      }
    };*/

    request.get(response, function(error, response, body) {
      if (error) {
        console.log(error);
      } else {
        console.log(body);
        return res.status(200).json({status:"Payment Successful", message: transaction_id });
      }
    });
  }
  catch(error){
    console.log(error);
    return res.status(500).json(error);
  }
}













/*exports.firstInstallment = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  try {
    const {
      transaction_id,
      paymentMode,
      duration,
      plotLayouts,
      totalPrice,
      amountPaid
    } = req.body;

    // Verifying the Payment from Flutterwave:
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${FLUTTERWAVE_SECRET_KEY}`
      }
    });

    const flutter = response.data.data;

    const ifFirstPayment = await Payment.findOne({
      Payer: user._id,
      property: id
    });

    if(ifFirstPayment) {
      console.log('This is your first payment for this property');
      return res.stat(400).json({ status:'failed', message:'This is your first payment for this property' })
    }

    // Create a Transaction using the Transaction Model
    const transactionData = {
      Payer: user._id,
      Property: id,
      flutterTransactionId: transaction_id,
      amount:flutter.amount,
      paymentMethod:'flutterwave',
      plotLayout: plotLayouts,
      status:flutter.status,
      currency: flutter.currency
    };

    const transaction = await Transaction.create(transactionData);
    if(!transaction) {
      console.log('Failed to create Transaction');
      return res.status(401).json({ status:'failed', message: 'Failed to create Transaction' });
    };

    const result = balancePayment(duration,totalPrice,amountPaid);

    // Creating Payment from the Payment Model:
    const paymentData = {
      Payer: user._id,
      amount: totalPrice,
      mode: "installment",
      paid: flutter.amount,
      balance: result.newTotalAmount,
      duration: duration,
      transactions: transaction._id,
      nextPayment: moment().add(1, 'M'),
      monthlyPayment: result.monthlyPayment,
      plotLayout: plotLayouts,
      status: 'ongoing',
      property: id
    };

    const payment = await Payment.create(paymentData);
    if(!payment) {
      console.log('Failed to create Payment');
      return res.status(401).json({ status:'failed', message: 'Failed to create Payment' });
    };

    // Updating plot Layouts in Property
    Property.updateMany(
      { 'plotLayout._id': { $in: plotLayouts}},
      { $set: { "plotLayout.$[].status" : "ongoingPayment"}},
      { multi: true, arrayFilters: [{ "element._id": { $in: plotLayouts } }] }
    )
    .then(result => { console.log(result); })
    .catch(error => { console.error(error); });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'failed', message: error });
  }
}

exports.middlePayment = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  try {
    const {
      transaction_id,
      paymentMode,
      amountPaid
    } = req.body;


     // Verifying the Payment from Flutterwave:
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${FLUTTERWAVE_SECRET_KEY}`
      }
    });

    const flutter = response.data.data;
    
    const transactionData = {
      Payer: user._id,
      flutterTransactionId: transaction_id,
      Property: id,
      amount:flutter.amount,
      paymentMethod:'flutterwave',
      status:flutter.status,
      currency: flutter.currency
    };

    const transaction = await Transaction.create(transactionData);
    if(!transaction) {
      console.log('Failed to create Transaction');
      return res.status(401).json({ status:'failed', message: 'Failed to create Transaction' });
    };

    // Updating Payment Object
    const payment = await Payment.findOne({
      Payer: user._id,

      property: id
    });
    payment.paid = payment.paid + flutter.amount;
    payment.balance = payment.balance - flutter.amount;
    payment.transactions = payment.transactions.push(transaction._id);
    payment.nextPayment = moment().add(1, 'M');
    
    const updatedPayment = await payment.save();
    if(!updatedPayment){
      console.log('Failed to update payment');
      return res.status(401).json({ status:'failed', message: 'Failed to update payment' });
    }

    console.log(updatedPayment);
    return res.status(200).json({ status:'success', message: updatedPayment });


  } catch (error) {
    console.log(error);
    return res.status(500).json({ status:'failed', message:error });
  }
}

exports.finalPayment = async(req, res) => {
  const user = req.body.user;
  const id = req.params.id;
  try {
    const {
      transaction_id,
      paymentMode,
      amountPaid
    } = req.body;


     // Verifying the Payment from Flutterwave:
    const url = `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`;

    const response = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${FLUTTERWAVE_SECRET_KEY}`
      }
    });

    const flutter = response.data.data;
    
    const transactionData = {
      Payer: user._id,
      flutterTransactionId: transaction_id,
      Property: id,
      amount:flutter.amount,
      paymentMethod:'flutterwave',
      status:flutter.status,
      currency: flutter.currency
    };

    const transaction = await Transaction.create(transactionData);
    if(!transaction) {
      console.log('Failed to create Transaction');
      return res.status(401).json({ status:'failed', message: 'Failed to create Transaction' });
    };

    // Updating Payment Object in DB
    const payment = await Payment.findOne({
      Payer: user._id,
      property: id
    });
    payment.paid = payment.paid + flutter.amount;
    payment.balance = 0;
    payment.transactions = payment.transactions.push(transaction._id);
    payment.nextPayment = null;
    payment.status = 'completed'
    
    const updatedPayment = await payment.save();
    if(!updatedPayment){
      console.log('Failed to update payment');
      return res.status(401).json({ status:'failed', message: 'Failed to update payment' });
    }

    // Updating plot Layouts in Property
    Property.updateMany(
      { 'plotLayout._id': { $in: payment.plotLayout}},
      { $set: { "plotLayout.$[].status" : "sold"}},
      { multi: true, arrayFilters: [{ "element._id": { $in: plotLayouts } }] }
    )
    .then(result => { console.log(result); })
    .catch(error => { console.error(error); });

    // Updating Referer Commision;
    const referer = await Esp.findOne(user.referer);
    if(referer){
      const money = directDownlinePercentage(referer.status, payment.amount);
      referer.commisionBalance += money;
      await referer.save();
    }
    const downliners = referer.networkDownline;
    console.log(downliners);
    for(let downline of downliners){
      if (downline === user._id) {
        const moneey = commissionFromDownline(referer.status, payment.amount);
        referer.commisionBalance += moneey;
        await referer.save();
      }
    }

    console.log(updatedPayment);
    return res.status(401).json({ status:'failed', message: updatedPayment });

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status:'failed', message:error });
  }
}*/
