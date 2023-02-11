const express = require('express');
const Admin = require('../../models/adminSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../config/constant');

exports.registerController = async (req, res) => {
  const {email, username, password, firstname, lastname, country, state, gender, phone } = req.body;
  try {
   const isExist = await Admin.findOne({ email });

  //  Checking for existence of User in DB
   if(isExist) {
    console.log('This account already exists in the database');
    return res.status(401).json({ status: 'failed', message:'This account already exists in the database' });
   }

  //  Hashinh Password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

  //  Persisting Admin to Database
  const admin = await Admin.create({
    username, email, 
    password: hashedPassword,
    firstname, lastname,
    country, state, gender, phone
  });

  if(!admin){
    console.log('Failed to create admin');
    return res.status(400).json({ status: 'failed', message:"Failed to create Admin"});
  }

  console.log(admin);
  return res.status(400).json({ status: 'success', message: admin });    
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

exports.login = async(req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username actually exists
    const admin = await Admin.findOne({ username }).select("+password");

    if(!admin){
      console.log("No such Admin staff exists");
      return res.status(400).json({ status:'failed', message: 'No such Admin staff exists'});
    }

    console.log(admin);

    // Validate password
    const validatedPassword = await bcrypt.compare(password, admin.password);
    if(!validatedPassword){
      console.log("No such Admin staff exists");
      return res.status(400).json({ status:'failed', message: 'No such Admin staff exists'});
    }

    // Generate JSON web Tokens
    const token = await jwt.sign({ _id: admin._id, role: admin.role }, TOKEN_SECRET, {
      expiresIn:"30d",
    });



    console.log(token);
    return res.status(200).json({ status:"success", message: {_id: admin._id, token }});
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
}

exports.delete = async(req,res)=> {
  try {
    const id = req.params.admin;
    
    const deleted = await Admin.findByIdAndDelete({id});
      if(!deleted){
        console.log('Could not delete Admin');
        return res.status(400).json({ status: "failed", message:"Could not delete Admin"});
      };
      
      console.log('Deleted succesfully');
      return res.status(200).json({ status:"success", message:"Deleted Successfuly"});
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
}