const Joi = require('joi')

const Schema = Joi.object({
    TransID:Joi.string().optional(),
    amount: Joi.string().required(),
    initialDeposit: Joi.string().optional(),
    paymentOption: Joi.number().optional(),
    mode: Joi.string().required().valid("outright","easybuy"),
    paid: Joi.number().optional(),
    balance: Joi.alternatives([Joi.string(),Joi.number()]),
    duration: Joi.string().optional(),
    nextPayment: Joi.string().optional(),
    paymentMethod: Joi.string().optional(),
})
const validatePropertySchema = Schema
module.exports = validatePropertySchema