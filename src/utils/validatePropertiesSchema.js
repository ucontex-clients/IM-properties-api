const Joi = require('joi')

const validatePropertySchema = (data) =>{
    const schema = new Joi.object({
        name: Joi.string().required(),
        pricePerSm: Joi.number().required(),
        about: Joi.string().required(),
        location: Joi.object().required(),
        layouts: Joi.object().required(),
        features: Joi.array().required(),
        category: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        LGA: Joi.string().required(),
        address: Joi.string().required(),
        // video: Joi.string().required(),
        // image: Joi.string().required(),
        // layouts: Joi.alternatives().try(Joi.array(), Joi.object()).allow().required(),
        // features: Joi.alternatives().try(Joi.array(), Joi.object()).allow().required()

        /////

        


//   name: Joi.string().required(),
//   type: Joi.string().required(),
  
//   bathRooms: Joi.number().required(),
//   bedRooms: Joi.string().required(),
//   duration: Joi.string().optional(),
//   description: Joi.string().required(),
//   leaseDuration: Joi.string().optional(),
//   country: Joi.string().required(),

//   subCategory: Joi.string().required(),

//   otherFaetures: Joi.array().optional(),
//   loan: Joi.number().optional(),
//   imaOriginal: Joi.boolean().optional(),
//   amenities: Joi.alternatives([Joi.string(), Joi.array()]).optional()
        /////

    })

    return schema.validate(data)
}

module.exports = validatePropertySchema