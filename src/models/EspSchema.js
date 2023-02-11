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

  paidDownline:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],

  paidSecondDownline:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],

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

// const upgradeLevel = function(next){
//   if (this.paidDownline.length >=1 && this.paidDownline.length <= 24 ) {
//   this.level = 'star1';
//   }
//   else if (this.paidDownline.length >=25 && this.paidDownline.length <= 49) {
//   this.level = 'team-leader';
//   }
//   else if(this.paidDownline.length >=50 && this.paidDownline.length <= 99){
//   this.level = 'super-partner';
//   }
//   else if(this.paidDownline.length >= 100){
//   this.level = 'diamond-director'
//   }
//   next();
// };

espSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser)
  // .pre('save', upgradeLevel)
  // .pre("find", upgradeLevel)
  // .pre('findOne', upgradeLevel)
  // .pre('findOneAndUpdate', upgradeLevel);
  
module.exports = mongoose.model('esp', espSchema );