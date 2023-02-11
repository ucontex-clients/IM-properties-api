const Joi = require('joi')

const Schema = Joi.object({
    name: Joi.string().required(),
    totalPlotSize: Joi.number().required(),
    ticker: Joi.string().required(),
    pricePerSm: Joi.number().required(),
    about: Joi.string().required(),
    estateFeatures: Joi.array().items(Joi.string()),
    propertyFeatures: Joi.array().items(Joi.string()),
    category: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    LGA: Joi.string().required(),
    address: Joi.string().required(),
})
const validatePropertySchema = Schema;
module.exports = validatePropertySchema