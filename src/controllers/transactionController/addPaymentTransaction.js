
const Payment = require("../../models/PaymentSchema")
const  validatePaymentSchema  = require("../../utils/validatePaymentSchema")

const addPaymentTransaction = async (req, res, next) => {
  try {
    const { error, value } = validatePaymentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }                     
    const paymentBy = req.user._id
    const transaction = await Payment.create(value);

    return res.status(201).json({ status: "success", data: transaction, paymentBy });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = addPaymentTransaction