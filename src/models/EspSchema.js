const mongoose = require('mongoose');
const express = require('mongoose');
const accountSchema = new mongoose.Schema({
  accountName:{
      type:String
  },
  accountNumber:{
      type:String
  },
  bankName:{
      type:String
  },
});


const espSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  referer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  network: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: 0
    }
  ],

  networkDownline: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: 0
    }
  ],

  level: {
    type: String,
    enum: ["activate","Star1", "team-leader", "super-partner", "diamond-director"],
    default: "activate"
  },

  commisionBalance: {
    type: Number,
    default: 0
  },

  accountDetails: {
    type: accountSchema
  },

  referralId: {
    type: String,
    unique: true
  }
},
{ timesstamps: true }
);

const populateUser = function (next) {
  this.populate("user", "_id lastName firstName phone email"),
  next();
};

espSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

module.exports = mongoose.model('esp', espSchema );