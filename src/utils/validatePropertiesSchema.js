const Joi = require('joi')

const validatePropertySchema = (data) =>{
    const schema = new Joi.object({
        name: Joi.string().required(),
        pricePerSm: Joi.number().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        // size: Joi.number().required(),
        location: Joi.string().required(),
        layouts: Joi.array().required(),
        features: Joi.array().required(),


    })

    return schema.validate(data)
}

module.exports = validatePropertySchema