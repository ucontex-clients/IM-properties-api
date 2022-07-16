const mongoose= require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    referer:{
        type:String,
    },
},{
    timestamps:true
})

module.exports = mongoose.model('User', UserSchema)