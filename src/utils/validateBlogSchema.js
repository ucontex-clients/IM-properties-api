const joi = require('joi')

const blogValidation = (data) =>{
    const schema = new joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        body: joi.string().required()
    })

    return schema.validate(data)
}

module.exports = blogValidation