const Joi = require('joi')

const validateUserDetails = (data) => {
    const schema = new Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        gender: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        lga: Joi.string().required(),
        phone1: Joi.string().required(),
        phone2: Joi.string(),
        date_of_birth: Joi.date().raw().required(),
        occupation: Joi.string().required(),
        address: Joi.string().required(),
        pictureupload: Joi.string(),
        idupload: Joi.string(),
        kin: Joi.object({
            nextofkin: Joi.string().required(),
            phone: Joi.string().required(),
            address: Joi.string().required()
        }),
        referer: Joi.string(),
    }) 
    return schema.validate(data)  
}
module.exports = validateUserDetails