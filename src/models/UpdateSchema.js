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

const UpdateSchema = new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,   
    },
    username:{
        type:String, 
    },
    password:{
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

module.exports = mongoose.model('Update', UpdateSchema)