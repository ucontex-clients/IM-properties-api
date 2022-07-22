const { Schema, model } = require("mongoose");


const categorySchema = new Schema(
  {
    name: {
      type: Number,
      required: true,
    },
    description: {
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

const category = model.Schema('Category', categorySchema)
module.exports = category