// const validateUserSchema = require('../utils/validateUserSchema')
const User = require('../../models/userSchema')
// const Joi = require('joi')
const bcrypt = require('bcryptjs')
const userSchemaValidation = require('../../utils/validateUserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/userSchema')
const validateUserLogin = require('../../utils/validateUserLogin')
const tokenSecret = process.env.TOKEN_SECRET

const registerController = async(req, res) => {
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

const loginController = async(req, res) => {
    try {
     const {body} = req
     const {error, value} = validateUserLogin(body)
     if(error){
          return res.status(400).json({error:{message: error.details[0].message}})
     }
     const user = await User.findOne({email:body.email}).select('+password')
     const isPassword = await bcrypt.compare(user.password,body.password)
     
     const token = jwt.sign({_id:user._id},tokenSecret, {expiresIn:'30d'})
 
        return res.status(200).json({message:"Login Successful",id:user._id, token})
    } catch (error) {
     res.status(500).json({error:{message: error}})
     console.log(error)
    }
 
 }
module.exports = {registerController,loginController}