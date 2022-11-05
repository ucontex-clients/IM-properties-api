const User = require("../../models/User");
const userSchemaValidation = require("../../utils/validateUserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {TOKEN_SECRET} = require('../../config/constant')
const validateUserLogin = require("../../utils/validateUserLogin");

const registerController = async (req, res) => {
  try {
    let { body } = req;

    const { error, value } = userSchemaValidation(body);
    if (error) {
      return res
        .status(400)
        .json({ error: { message: error.details[0].message } });
    }
    
    const userExist = await User.findOne({ email: body.email });
    if (userExist) {
      return res.status(400).json({
        error: { message: "Hey!! we already have you on board. Simply login" }
      });
    }
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    body.role ="admin"

    const newUser = await User.create(body);
    return res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
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
      res.status(400).json({ message: "invalid username and password" });
    }
  } catch (error) {
    res.status(500).json({ error: { message: error } });
    console.log(error);
  }
};
module.exports = { registerController, loginController };
