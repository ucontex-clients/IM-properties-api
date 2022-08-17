const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  addedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });


const populateUser = function (next) {
    this.populate("addedBy", "_id email firstname lastname username image");
    next();
  };
  
  BlogSchema.pre("find", populateUser)
    .pre("findOne", populateUser)
    .pre("findOneAndUpdate", populateUser);

const Blog = mongoose.model('Blog', BlogSchema);
module.exports = Blog;