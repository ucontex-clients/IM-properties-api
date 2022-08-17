const Blog = require("../../models/BlogSchema");
const validateBlogSchema = require("../../utils/validateBlogSchema");

const blog_create_post = (req, res) => {
  let { body } = req;
  const { error, value } = validateBlogSchema(body);
  if (error) {
    return res.json({ error: { message: error.details[0].message } });
  }
  const blog = new Blog(body);
  blog
    .save()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
};

module.exports = blog_create_post;
