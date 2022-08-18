const { Schema, model } = require("mongoose");

const layoutSchema = new Schema(
  {
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
    }
  },
  {
    timestamps: true,
  }
);

const PropertySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pricePerSm: {
    type: Number,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // required: true,
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
  },
  status: {
    type: String,
    enum: ['Available','Not Available','Sold'],
    default: 'Available'
  },
  location: {
    type: String,
  },
  layouts: {
    type: [layoutSchema],
  },
  features:{
    type:Array,
    required: true
  }
});

const populateUser = function (next) {
  this.populate("addedBy", "_id email firstname lastname username");
  this.populate("category");

  next();
};

PropertySchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Property = model("Property", PropertySchema);

module.exports = Property;
