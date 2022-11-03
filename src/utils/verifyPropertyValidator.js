const Joi = require ("joi")

const verifyAPropertyValidator = (data) =>{
    const schema = new Joi.object({
        propertyMessage: Joi.string().required(),
        status: Joi.string().required()
    })

    return schema.validate(data)
}

module.exports = verifyAPropertyValidator