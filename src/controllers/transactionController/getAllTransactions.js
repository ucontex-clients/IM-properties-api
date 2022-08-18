const Transaction = require("../../models/TransactionSchema");

const getAllTransactionController = async (req, res) => {
  try {
    const transaction = await Transaction.find();
    return res.status(200).json(transaction);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

module.exports = getAllTransactionController;
