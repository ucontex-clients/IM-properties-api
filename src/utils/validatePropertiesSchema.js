const Joi = require('joi')

const Schema = Joi.object({
    name: Joi.string().required(),
    pricePerSm: Joi.number().required(),
    about: Joi.string().required(),
    // location: Joi.object().required(),
    // layouts: Joi.object().required(),
    features: Joi.alternatives([Joi.string(), Joi.array()]).optional(),
    category: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    LGA: Joi.string().required(),
    address: Joi.string().required(),
    color: Joi.string().required(),
})
const validatePropertySchema = Schema
module.exports = validatePropertySchema