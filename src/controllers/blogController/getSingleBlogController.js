const Blog = require("../../models/BlogSchema");

const getSingleBlogController = async (req, res) => {
  try {
    const blog = await Blog.findById({_id:req.params.id});
    if (blog) {
      return res.status(200).json(blog);
    } else {
      return res.status(400).json("no blog found");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

module.exports = getSingleBlogController;
