
const User = require('../../models/userSchema')


const getAllUserController = async(req,res) => { 
    try {
        const user = await User.find()
        if(user){
            return res.status(200).json(user)
    }else{
        return res.status(400).json('no user found')
    }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}


const getSingleUserController = async(req,res) => { 
    try {
        const user = await User.findById(req.params.id)
        if(user){
            return res.status(200).json(user)
    }else{
        return res.status(400).json('no user found')
    }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}

const updateUserController=  async(req,res) => { 
    try {
        let {body} = req
        const update = await User.findByIdAndUpdate(req.params.id,
                  {
                    $set: body
                },
                { new:true})
        
          return res.status(200).json(update)
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}


const deleteUserController = async(req,res) => { 
    try {
            const userFound = await User.findById(req.params.id)
             if(userFound){
             await User.findByIdAndDelete(req.params.id)
             return res.status(200).json(`user deleted`)
      }else{
        res.status(401).json('user not found')
     }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}
module.exports = {getAllUserController, getSingleUserController, updateUserController, deleteUserController}
