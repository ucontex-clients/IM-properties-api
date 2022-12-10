const {Schema,model} = require('mongoose')

const ReviewSchema = new Schema({
    message:{
        type:String,
        required:true
    },
    addedBy:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },

    // property: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Property'
    // }
},{
    timestamps:true
})

module.exports = model('Review', ReviewSchema)