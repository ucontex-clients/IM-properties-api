const Joi = require('joi')

const updatePropertyValidator = (data) =>{
    const schema = new Joi.object({
      name: Joi.string().required(),
      type: Joi.string().required(),
      category: Joi.string().required(),
      price: Joi.number().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      LGA: Joi.string().required(),
      address: Joi.string().required(),
      bathRooms: Joi.number().required(),
      bedRooms: Joi.string().required(),
      duration: Joi.string().optional(),
      description: Joi.string().required(),
      leaseDuration: Joi.string().optional(),
      country: Joi.string().required(),
    
      // buildingAge: Joi.string().required(),
      // buildingType: Joi.string().required(),
      subCategory: Joi.string().required(),
    
      otherFaetures: Joi.array().optional(),
      loan: Joi.number().optional(),
      imaOriginal: Joi.boolean().optional(),
      amenities: Joi.alternatives([Joi.string(), Joi.array()]).optional()
    })

    return schema.validate(data)
}

module.exports = updatePropertyValidator