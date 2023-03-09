const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const express = require('express');

const updateUserEmail = async (req, res) => {
    const data = {
        email : req.body.newEmail
    }
    try{
        const checkemail = await User.findOne({email : req.body.oldEmail}).select("+password");

        if(!checkemail){
            return res.status(400).json("Invalid Email");
        }
        else if(!(checkemail && await bcrypt.compare(req.body.pass, checkemail.password))){
            return res.status(400).json("Invalid Password");
        }
        else{
            const changedEmail = await User.findOneAndReplace(req.body.oldEmail, data, {new : true})

            if(changedEmail){
                return res.status(200).json({ status: "success", message: changedEmail});
            }else return res.status(400).json("Cannot update your email..Try Again");
        }
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({ status: 'failed', message: error.message });
    }
}

module.exports = updateUserEmail;