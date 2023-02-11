const mongoose= require('mongoose')


const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true
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
        enum:['normalAdmin','superAdmin'],
        default: 'normalAdmin'
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,   
    },
    country:{
        type:String,
    },
    state:{
        type:String,      
    },
    gender:{
        type:String,  
    },
    phone:{
        type:Number,
    },
},{
    timestamps:true
})



module.exports = mongoose.model('Admin', AdminSchema)