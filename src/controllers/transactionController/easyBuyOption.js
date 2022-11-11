const Payment = require("../../models/PaymentSchema")
const  validatePaymentSchema  = require("../../utils/validatePaymentSchema")

const easyBuyOption = async (req, res, next) => {
  try {
    const { error, value } = validatePaymentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: { message: error.details[0].message }
      });
    }                     
    const paymentBy = req.user._id
    if(value.mode === "outright"){;
      return res.status(201).json({ status: "message", 
                                  data: "Please pay into designated account details",
                                   paymentBy });
    }
    

    if(value.mode === "easybuy"){

      if(["3-months"].includes(value.duration)){
        const paid = 1.1* value.amount
        const balance = value.balance - paid
      }
      if(["6-months"].includes(value.duration)){
        const paid = 1.2* value.amount
        const balance = value.balance - paid    }
      if(["12-months"].includes(value.duration)){
        const paid = 1.4* value.amount
        const balance = value.balance - paid
      }

      const data = {
        initialDeposit: value.initialDeposit,
        amount: value.amount,
        nextPayment: value.nextPayment,
        duration:value.duration,
        paymentOption:value.mode
      }
      const transaction = await Payment.create(value);
      return res.status(201).json({ status: "success", transaction, paymentBy, data });
    }
    
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = easyBuyOption