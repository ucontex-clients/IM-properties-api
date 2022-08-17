const User = require("../../models/User");
const slugify = require("slugify");
const vaildateUserDetails = require("../../utils/vaildateUserDetails");

const addUserDetailsController = async (req, res) => {
  try {
    let { body, file } = req;
    const { error, value } = vaildateUserDetails(body);
    if (error) {
      return res.json({ error: { message: error.details[0].message } });
    }
    body.images = file.path;
    const { _id } = req.user;
    console.log(_id);

    const user = new User({ ...body, addedBy: _id });
    // console.log(preProduct);
    const userInfo = await user.save();
    return res.status(201).json(userInfo);
  } catch (error) {
    console.log(error);
  }
};

module.exports = addUserDetailsController;
