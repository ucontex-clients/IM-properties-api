const Property = require("../../models/PropertySchema");
const slugify = require("slugify");
const validatePropertySchema = require("../../utils/validatePropertiesSchema");
// const{ uploads} = require('../../utils/uploads');
const cloudinary = require('../../config/cloudinary2');
const fs = require('fs');

exports.createProps = async(req, res) => {
  const data = {
    name,
    ticker,
    totalPlotSize,
    estateFeatures,
    propertyFeatures,
    pricePerSm,
    category,
    about
  } = req.body;

  try {
    const files = req.files;
    if(files && files.length < 1) {
      return res.status(401).json({
      error: { message: "At least one image must be uploaded" }}) 
    }

    data.imagesURLs = [];
    

    const results = await files.map(async (file) => {
      return await cloudinary.uploader.upload(file.path);
    })

   const newArr = await Promise.all(results);
   newArr.forEach( arr => {
    data.imagesURLs.push(arr.secure_url)
   });
    
  
  data.location = {
    state: req.body.state,
    LGA: req.body.LGA,
    city: req.body.city,
    address: req.body.address
  };

  data.addedBy = req.admin;

  const property = await Property.create(data);
  if(!property) {
    console.log('Failed to create Property');
    return res.status(401).json('Failed to create Property')
  }
  
  console.log(property);
  return res.status(200).json(property);

  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message)
  }
}