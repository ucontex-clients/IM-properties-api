const mongoose= require('mongoose')

const KinSchema = new mongoose.Schema({
    nextofkin:{
        type:String
    },
    phone:{
        type:Number
    },
    address:{
        type:String
    }
})

const UploadSchema = new mongoose.Schema({
    idUpload:{
        type:String,
    },
    pictureUpload:{
        type:String,  
    },
})

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
    phone1:{
        type:Number,
    },
    phone2:{
        type:Number,
    },
    address:{
        type:String,
    },
   upload:{
    type: UploadSchema
   },
    kin:{
        type: KinSchema,
        
    },
},{
    timestamps:true
})



module.exports = mongoose.model('User', UserSchema)