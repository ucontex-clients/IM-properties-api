const User = require("../../models/User");
const userSchemaValidation = require("../../utils/validateUserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {TOKEN_SECRET} = require('../../config/constant')
const ESP = require('../../models/EspSchema');
const validateUserLogin = require("../../utils/validateUserLogin");
const { populate } = require("../../models/User");

const registerControllers = async (req, res) => {
  try {

    const checkmail = await User.findOne({ email: req.body.email });

    if(checkmail) {
      console.log('Oops you are already registered, just SignIn');
      return res.status(400).json({ status:'failed', message:'Oops you are already registered, just SignIn'})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = {
      username: req.body.username,

      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      terms: req.body.terms
    };

    if(req.body.referer){
      const referredBy = await ESP.findOne({ referralId: req.body.referer });
      if(!referredBy) {
        console.log('Wrong Referal Code')
        return res.status(400).json('Wrong Referal Code');
      }

      data.referer = referredBy._id;
      console.log('========================================referredBy');
      console.log(referredBy);


      const newUser = await User.create(data);
      referredBy.network.push(newUser._id);
      await referredBy.save();

      if(referredBy.referer){
        console.log('========================================referedBy.referal');
        console.log(referredBy.referer);
        const grande =await ESP.findById(referredBy.referer);
        grande.networkDownline.push(newUser._id);
        grande.save();
        console.log('==================================grande');
        console.log(grande);
      }

      console.log('========================================newUser');
      console.log(newUser);
      return res.status(200).json({ status:'success', message: newUser });

    };
    
    const newUser = await User.create(data);

    if(!newUser) {
      console.log('Could not create User');
      return res.status(400).json({ status:'failed', message: 'Could not create User' });
    }
    else{
      console.log('========================================newUser');
      console.log(newUser);
      const token = jwt.sign({ _id: newUser._id, role: newUser.role }, TOKEN_SECRET, {
        expiresIn: "30d",
      });
      return res.status(200).json({ status: 'success', id: newUser._id, token });

    }
    
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const loginController = async (req, res) => {
  try {
    const { body } = req;
    //  console.log(body)
    const { error, value } = validateUserLogin(body);
    //  console.log(value)
    if (error) {
      res.status(400).json({ error: { message: error.details[0].message } });
    }
    const user = await User.findOne({ email: body.email }).select("+password");
    if (user && await bcrypt.compare(body.password, user.password)) {
      const token = jwt.sign({ _id: user._id, role: user.role }, TOKEN_SECRET, {
        expiresIn:"30d",
      });
      return res
        .status(200)
        .json({ message: "Login Successful", id: user._id, token });
    } else {
      res.status(400).json({ message: "invalid email and password" });
    }
  } catch (error) {
    res.status(500).json({ error: { message: error } });
    console.log(error);
  }
};
module.exports = { registerControllers, loginController };
