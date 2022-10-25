const Joi = require('joi')

const validatePropertySchema = (data) =>{
    const schema = new Joi.object({
        name: Joi.string().required(),
        pricePerSm: Joi.number().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        layouts: Joi.array().required(),
        features: Joi.array().required(),
        video: Joi.string().required(),
        image: Joi.string().required(),
        // layouts: Joi.alternatives().try(Joi.array(), Joi.object()).allow().required(),
        // features: Joi.alternatives().try(Joi.array(), Joi.object()).allow().required()

    })

    return schema.validate(data)
}

module.exports = validatePropertySchema