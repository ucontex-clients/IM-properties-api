const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    account_number: {
      type: Number,
    },
    account_name: {
      type: String,
    },
    bank_name: {
      type: String,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
        type: Array,
        enum: ['pending','approved'],
        default: 'pending'
      },
  },
  {
    timestamps: true,
  }
);



const populateUser = function (next) {
  this.populate("addedBy", "_id lastName firstName phone email");

  next();
};

PaymentSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
