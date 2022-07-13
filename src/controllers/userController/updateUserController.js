const User = require('../../models/userSchema')
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

module.exports = updateUserController