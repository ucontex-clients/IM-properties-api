const { Schema, model } = require("mongoose");


const PropertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pricePerSm: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  color:{
    type:String,
    required: true
  },
  //  layoutImage:{
  //   type:String,
  //   required: true
  // },
  // isAvailable: {
  //   type: Boolean,
  //   default: true
  // },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  about: {
    type: String,
    required: true,
  },
  LGA: {
    type: String
  },
  // location: {
  //   type: Object
  // },
  // image: {
  //   type: String,
  // },
  video: {
    type: String,
  },
  catSlug: {
    type: String,
  },
  nameSlug: {
    type: String,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    default: "62d77b4b251bc07f567efa10"
  },
  status: {
    type: String,
    enum: ['Available','Not Available','Sold'],
    default: 'Available'
  },
  location: {
    type: String,
  },
  // features:{
  //   type:Array,
  //   required: true
  // },
  // isPublished: {
  //   type: Boolean,
  //   default: true
  // },
  // featured: {
  //   type: Boolean,
  //   default: false
  // },
  layoutImageMedia: {
    type: Object,
    select: false
  },
  layoutImageURL: {
    type: String
  },
  imagesURLs: {
    type: [String]
  },
  imagesMedia: {
    type: [Object],
    select: false
  },
  reviews: {
    type: [{ type: Schema.Types.ObjectId, ref: "Review" }]
  }
});

const populateUser = function (next) {
  this.populate("addedBy", "_id email username");
  this.populate("category");
  this. populate("reviews")
  next();
};

PropertySchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Property = model("Property", PropertySchema);

module.exports = Property;

