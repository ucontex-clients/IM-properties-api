const { Schema, model } = require("mongoose");


const PropertySchema = new Schema({
  name: {
    type: String,
  },
  pricePerSm: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
  },
  width: {
    type: Number,
  },
  length: {
    type: Number,
  },
  color:{
    type:String,
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
    type:Object,
  },
  about: {
    type: String,
    required: true,
  },
  LGA: {
    type: String
  },
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
    type: Object,
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
    // select: false
  },
  // reviews: {
  //   type: [{ type: Schema.Types.ObjectId, ref: "Review" }]
  // }
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

