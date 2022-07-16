
const User = require('../../models/UserSchema')


const getAllUserController = async(req,res) => { 
    try {
        const user = await User.find()
        return res.status(200).json(user)
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}

module.exports = getAllUserController
