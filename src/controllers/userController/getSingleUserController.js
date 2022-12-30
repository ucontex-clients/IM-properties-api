const User = require("../../models/User");

exports.getSingleUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json("no user found");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};


exports.getAnySingleUser = async(req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('referer');
    if(user){
      console.log(user);
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}
