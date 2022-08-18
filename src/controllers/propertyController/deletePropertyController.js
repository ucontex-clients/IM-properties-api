const Property = require("../../models/PropertySchema");

const deletePropertyController = async (req, res) => {
  try {
    const propFound = await Property.findById(req.params.id);
    if (propFound) {
      await Property.findByIdAndDelete(req.params.id);
      return res.status(200).json(`property deleted`);
    } else {
      res.status(401).json("property not found");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
};

module.exports = deletePropertyController;
