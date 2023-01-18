const {Schema,model} = require('mongoose')

const TestimonialSchema = new Schema({
    video:{
        type:String,
        required:true
    },
    addedBy:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property'
    }
},{
    timestamps:true
})
;
module.exports = model('Testimonial', TestimonialSchema);