const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    amount: {
      type: Number
    },
    kind: {
      type: String,
      enum: ["deposit", "withdrawal", "payment"],
      default: "deposit"
    },
    reference: {
      type: Object
    },
    transactionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

TransactionSchema.pre("validate", function (next) {
  if (this.name) {
    this.catSlug = slugify(this.name, {
      lower: true,
      strict: true
    });
  }

  next();
});

const populateUser = function (next) {
  this.populate("transactionBy", "_id lastName firstName phone email");

  next();
};

TransactionSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
