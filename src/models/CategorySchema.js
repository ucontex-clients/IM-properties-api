const { Schema, model } = require("mongoose");


const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    nameSlug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const category = model('Category', categorySchema)
module.exports = category