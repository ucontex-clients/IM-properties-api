
const Property = require('../../models/PropertySchema')

const getSinglePropertyController = async(req,res) => { 
    try {
        const property = await Property.findById(req.user._id)
        if(user){
            return res.status(200).json(property)
    }else{
        return res.status(400).json('no property found')
    }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}



module.exports = getSinglePropertyController