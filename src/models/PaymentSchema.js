const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    mode: {
      type: String,
      enum: [ "easybuy", "outright"],
      default: "outright"
    },
    TransID: {
      type: String,
      default:"IM 0023"
    },
    // order: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Order",
    // },
    transactionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paid:{
      type:Number
    },
    balance:{
      type: Number,
    },
    duration:{
      type: String,
      enum: ["3-months","6-months","12-months"],
      default:"3-months"
    },
    paymentMethod:{
      type: String,
      enum: ["flutterwave","bankPayment"],
      default:"flutterwave"
    },
    nextPayment:{
      type: String,
      default:"next month"
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

paymentSchema.pre("validate", function (next) {
  if (this.name) {
    this.catSlug = slugify(this.name, {
      lower: true,
      strict: true
    });
  }

  next();
});

const populateUser = function (next) {
  this.populate("transactionBy", "_id lastName firstName phone email"),
  // this.populate("order");
  this.popualte("property")
  next();
};

paymentSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
