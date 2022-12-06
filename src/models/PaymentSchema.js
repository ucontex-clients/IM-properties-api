const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Property = require('./PropertySchema');
const Transaction = require('./TransactionSchema');

const paymentSchema = new Schema(
  {
    amount: {
      type: Number,
    },

    mode: {
      type: String,
      enum: [ "installment", "outright"],
      default: "outright"
    },

    paid:{
      type:Number
    },

    balance:{
      type: Number,
    },

    duration:{
      type: String,
      enum: ["none","3-months","6-months","12-months"],
      default:"none"
    },

    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction"
      }
    ],

    nextPayment:{
      type: Date,
      default:"Null"
    },

    property:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Property",
    }
  },
  {
    timestamps: true
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;


// paymentSchema.pre("validate", function (next) {
//   if (this.name) {
//     this.catSlug = slugify(this.name, {
//       lower: true,
//       strict: true
//     });
//   }

//   next();
// });

// const populateUser = function (next) {
//   this.populate("transactionBy", "_id lastName firstName phone email"),
//   // this.populate("order");
//   this.popualte("property")
//   next();
// };

// paymentSchema.pre("find", populateUser)
//   .pre("findOne", populateUser)
//   .pre("findOneAndUpdate", populateUser);