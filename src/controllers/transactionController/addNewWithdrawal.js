const Transaction = require("../../models/TransactionSchema")
import { addWithdrawalValidator } from "../../validators";

const addNewWithdrawal = async (
  req,
  res,
  next
) => {
  try {
    const { error, value } = addWithdrawalValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }                      //@ts-ignore
    const withdrawalBy = req.user._id
    const transaction = await Transaction.create(value);
    return res.status(201).json({ status: "success", data: transaction, withdrawalBy });
  } catch (error) {
    console.log(error);
    next(error);
  }
};