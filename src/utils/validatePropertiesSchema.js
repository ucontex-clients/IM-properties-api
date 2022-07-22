const Joi = require('joi')

const validatePropertySchema = (data) =>{
    const schema = new Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        size: Joi.number().required(),
        location: Joi.string().required(),
    })

    return schema.validate(data)
}

module.exports = validatePropertySchema