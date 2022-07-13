const User = require('../../models/userSchema')
const tokenSecret = process.env.TOKEN_SECRET
const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, tokenSecret,(err,decoded)=>{
                if(err){
                    res.status(401).json({error:{message:'Access denied, Invalid token'}})
                }else{
                    req.user = await User.find(decoded.id)
                    next()
                }
            })
        }catch(err){
            res.status(400).json(err)
        }
    }
    if(!token){
        res.status(400).json({error:{message:'Access denied, No token for authorization'}})
    }
}

const verifyUserAndAdmin = (req, res, next) => {
    verifyToken(req, res, () =>{
        if(req.user.id === req.params.id || ['admin'].includes(req.user.role)){
            next()
        }else{
            res.status(400).json({error:{message:'Access denied, Not authorized.'}})
        }
    })
}

const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, () =>{
        if(['admin'].includes(req.user.role)){
            next()
        }
    })
    
}
module.exports = {verifyToken, verifyUserAndAdmin, verifyAdmin}