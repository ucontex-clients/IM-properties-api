// const validateUserLogin = require('../utils/validateUserLogin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/userSchema')
const validateUserLogin = require('../../utils/validateUserLogin')
const tokenSecret = process.env.TOKEN_SECRET



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


module.exports = loginController