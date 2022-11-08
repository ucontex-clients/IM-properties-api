
const Transaction = require("../../models/TransactionSchema")
import { addFundingValidator } from "../../validators";

export const addNewFunding = async (req, res, next
) => {
  try {
    const { error, value } = addFundingValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }                      //@ts-ignore
    const fundingBy = req.user._id
    const transaction = await Transaction.create(value);

    return res.status(201).json({ status: "success", data: transaction, fundingBy });
  } catch (error) {
    console.log(error);
    next(error);
  }
};