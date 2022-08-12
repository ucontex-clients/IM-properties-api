const Blog = require('../../models/BlogSchema');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err)

    });
}

module.exports = blog_index