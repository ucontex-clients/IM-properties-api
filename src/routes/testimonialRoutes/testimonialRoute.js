const express = require('express');
const router = express.Router();
const TestimonialController = require('../../controllers/testimonialController/testimonialController');
const { uploads } = require('../../config/multer2');
const verifyToken = require('../../middleware/authMiddleware/verifyToken');

router.post('/create/:id', verifyToken, uploads.single('video'), TestimonialController.createTestimonial);

router.get('/getall', TestimonialController.getAllTestimonial);

router.get('/propertytestimonial/:id', TestimonialController.getTestimonialProperty);

module.exports= router;