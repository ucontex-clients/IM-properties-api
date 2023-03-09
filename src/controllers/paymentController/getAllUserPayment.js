const express = require('express');
const Payment = require('../../models/PaymentSchema');

const getAllUserPayment = async (req, res) => {
    try {
        const payment = await Payment.findById({ Payer: req.user._id});

        if(!payment){
            return res.status(400).json("User haven't make any payment");
        }

        const data = payment.map(pay => {
            return {
                id: pay._id,
                amount: pay.amount,
                mode: pay.mode,
                duration: pay.duration,
                paid: pay.paid,
                balance: pay.balance,
                next_pay: pay.nextPayment,
                month_pay: pay.monthlyPayment,
                plots: pay.plotLayout.length,
                status: pay.status,
                property_name: pay.property.name
            }
        });

        console.log(data);
        return res.status(200).json(data);
    }
    catch(error){
        return res.status(500).json(error.message);
    }
};

module.exports = getAllUserPayment;