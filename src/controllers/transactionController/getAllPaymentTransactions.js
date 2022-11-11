const Payment = require("../../models/PaymentSchema")
const getAllPaymentTransactions = async ( req,res,next) => {
  try {
    let {limit = 10,page = 1} = req.query;
    page = page || 1;
    const skip = page ? (page - 1) * limit : 0;
    let option = {};

    const count = await Payment.find(option).sort({updatedAt:-1}).countDocuments();
    // const pages = count>0?Math.ceil(count / limit)?Math.ceil(count / limit): 1;
    let pages = 0;
    if (count > 0) {
      if (limit) {
        pages = Math.ceil(count / limit);
      } else {
        pages = 1;
      }
    }

    const result= {};
    limit = limit - 0;

    if (page * 1 < pages) {
      result.next = { limit, page: page * 1 + 1 };
    }
    if (page * 1 <= pages && page - 1 != 0) {
      result.previous = { limit, page: page - 1 };
    }

    const payment = await Payment.find(option)
      .populate("addedBy")
      .limit(limit * 1)
      .skip(skip);
    return res
      .status(200)
      .json({ status: "success", data: { ...result, count, pages, payment } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllPaymentTransactions