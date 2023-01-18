const Property = require("../../models/PropertySchema");
const slugify = require("slugify");
const validatePropertySchema = require("../../utils/validatePropertiesSchema");
const cloudinary = require('../../config/cloudinary2');
const fs = require('fs');
const { findByIdAndUpdate } = require("../../models/adminSchema");

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
      const result = await cloudinary.uploader.upload(file.path);
      fs.unlink(file.path, (err) => {
        if (err) throw err;
        console.log(`${file.path} was deleted`);
      });
      return result;
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



exports.uploadVideos = async(req, res) => {
  try {
    const file = req.file;
    console.log(file);
    const fName = file.originalname.split(".")[0];

    const result = await cloudinary.uploader.upload(file.path, 
      { 
        resource_type: 'video',
        public_id: `videoUploads/${fName}`,
        chunk_size: 6000000,
        eager: [
          {
            width: 300,
            height: 300,
            crop: "pad",
            audio_codec: 'none'
          },
          {
            width: 300,
            height: 300,
            crop: "crop",
            gravity: "south",
            audio_codec: 'none'
          },
        ]
      });
    if(!result) {
      console.log('Video upload failed');
      return res.status(400).json({ status:'failed', message:'video upload failed'});
    }

    console.log(result);

    fs.unlink(file.path, (err) => {
      if (err) throw err;
      console.log(`${file.path} was deleted`);
    });

    console.log(`This is result: ${result}`);

    const property = await Property.findByIdAndUpdate(req.params.id, {
      video: result.secure_url
    },
    { new: true }
    );

    if(!property){
      console.log('failed to update Property object');
      return res.status(400).json({ status:'failed', message:'failed to update Property object'});
    }

    console.log(property);
      return res.status(200).json({ status:'success', message:property});
        
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message)
  }
};