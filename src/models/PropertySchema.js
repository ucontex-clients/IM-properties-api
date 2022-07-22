const { Schema, model } = require("mongoose");

const LocationSchema = new Schema(
  {
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    LGA: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SizeSchema = new Schema(
  {
    width: {
      type: Number,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
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
  price: {
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
    required: true,
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
    enum: ['Available','Not Available','Sold']
  },
  location: {
    type: LocationSchema,
  },
  size: {
    type: SizeSchema,
  },
});

const populateUser = function (next) {
  this.populate("addedBy", "_id email firstname lastname username image");
  next();
};

PropertySchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Property = model("Property", PropertySchema);

module.exports = Property;
