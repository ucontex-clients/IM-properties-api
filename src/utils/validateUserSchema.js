const joi = require('joi')

const signupValidation = (data) =>{
    const schema = new joi.object({
        username: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required()
    })

    return schema.validate(data)
}

module.exports = signupValidation