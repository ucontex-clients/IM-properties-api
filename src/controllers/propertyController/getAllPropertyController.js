
const Property = require('../../models/PropertySchema')

const getAllUserController = async(req,res) => { 
    try {
        const property = await Property.find()
        return res.status(200).json(property)
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error)
    }
}

module.exports = getAllUserController
