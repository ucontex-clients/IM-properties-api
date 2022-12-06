const mongoose = require('mongoose');
const Property = require('./PropertySchema');
const Payer = require('./User');
const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    Payer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    Property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    paymentMethod: {
      type: String,
      enum: ['flutterwave', 'offlinePayment', 'bankTransfer'],
      required: true
    },

    date: {
      type: Date,
      default: Date.now()
    },

    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ['NGN', 'USD', 'EUR', 'GBP']
    },

    status: {
      type: String,
      required: [true,'Payment status is needed'],
      enum: ["successful", "pending", 'failed'],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('transaction', transactionSchema);