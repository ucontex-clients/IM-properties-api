const mongoose = require('mongoose');
const Property = require('./PropertySchema');
const Payer = require('./User');
const Schema = mongoose.Schema;

const BankTransferSchema = new Schema({
  Payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },

  Property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true
  },

  uploadUrl: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now()
  },

  mode: {
    type: String,
    enum: [ "installment", "outright"],
    default: "outright"
  },

  duration:{
    type: String,
    enum: ["none","3-months","6-months","12-months"],
    default:"none"
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed"],
    default: "Pending"
  }
})

module.exports = mongoose.model('bankTransfer', BankTransferSchema );