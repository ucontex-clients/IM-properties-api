const express = require('express');
const Testimonial = require('../../models/Testimonial');
const cloudinary = require('../../config/cloudinary2');
const fs = require('fs');

exports.createTestimonial = async(req, res)=> {
  const user = req.user;
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

    const testimonial = await Testimonial.create({
      video: result.secure_url,
      addedBy: user._id,
      property: req.params.id
    });

    if(!testimonial){
      console.log('Failed to create Testimonial');
      return res.status(404).json({ status:'failed', message:'Failed to create Testimonial'});
    };

    console.log(testimonial);

    fs.unlink(file.path, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File removed');
    })


    return res.status(200).json({status:'success', message: testimonial });
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message)
  }
}

exports.getAllTestimonial = async(req, res) => {
  try {
    const testimonials = await Testimonial.find();
    if(!testimonials) {
      console.log('No Testimonial to show');
      return res.status(401).json({ status:'failed', message:'No testimonial to show'} );
    }

    console.log(testimonials);
    return res.status(200).json({ status:'success', message: testimonials });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

exports.getTestimonialProperty = async(req, res) => {
  try {
    const testimonials = await Testimonial.find({ property: req.params.id});
    
    if(!testimonials) {
      console.log('No Testimonial to show');
      return res.status(401).json({ status:'failed', message:'No testimonial to show'} );
    }

    console.log(testimonials);
    return res.status(200).json({ status:'success', message: testimonials });
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
}