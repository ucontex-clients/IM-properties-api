// const validateUserSchema = require('../utils/validateUserSchema')
const User = require('../../models/userSchema')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const userSchemaValidation = require('../../utils/validateUserSchema')

const userController = async(req, res) => {
try {

    let {body} = req
    console.log(body)
    const {error, value} = userSchemaValidation(body)
    if(error){
         return res.status(400).json({error:{message: error.details[0].message}})
    }
    const userExist = await User.findOne({email:body.email})
    if(userExist){
        return res.status(400).json({error:{message:'Hey!! we already have you on board. Simply login'}})
    }
    const salt =await bcrypt.genSalt(10)
    body.password = await bcrypt.hash(body.password,salt)

    const newUser =await User.create(body)
        return  res.status(200).json(newUser)
    
} catch (error) {
     res.status(500).json(error)
}
}
module.exports = userController