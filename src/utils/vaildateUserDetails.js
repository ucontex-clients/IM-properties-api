const Joi = require('joi')

const validateUserDetails = (data) => {
    const schema = new Joi.object({
        // email: Joi.string().email().required(),
        password: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        gender: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        phone1: Joi.string().required(),
        phone2: Joi.string().required(),
        address: Joi.string().required(),
        upload: Joi.string().required(),
        kin: Joi.string().required(),
        referer: Joi.string().required(),
        username: Joi.string().required()
    }) 
    return schema.validate(data)  
}
module.exports = validateUserDetails