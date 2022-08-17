const Blog = require("../../models/BlogSchema");

//update property logic
const editBlogController = async (req, res) => {
  try {
    let { body } = req;
    const update = await Blog.findByIdAndUpdate(
      req.user._id,
      {
        $set: body
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Update Successful", updated: body, update });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

module.exports = editBlogController;
