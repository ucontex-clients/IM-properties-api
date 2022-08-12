const Blog = require('../../models/BlogSchema');

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      return res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json(err)

    });
}

module.exports = blog_delete
