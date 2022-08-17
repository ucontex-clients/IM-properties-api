const {schema,model} = require('mongoose')

const ReviewSchema = new schema({
    message:{
        type:String,
        required:true
    },
    addedBy:{
        type: schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true
})

module.exports = model('Review', ReviewSchema)