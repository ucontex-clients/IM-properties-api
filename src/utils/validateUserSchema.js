const joi = require('joi')

const signupValidation = (data) =>{
    const schema = new joi.object({
        username: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        referedBy: joi.string(),
        role: joi.string().required().valid("ESP","Buyer"),
        terms: joi.boolean().required()
    })

    return schema.validate(data)
}

module.exports = signupValidation