const Joi = require('joi')

const validateUserLogin = (data) => {
    const schema = new Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }) 
    return schema.validate(data)  
}
module.exports = validateUserLogin