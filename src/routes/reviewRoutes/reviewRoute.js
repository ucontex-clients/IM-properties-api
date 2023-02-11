const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController/createReview');
const verifyToken = require('../../middleware/authMiddleware/verifyToken');

router.post('/create/:id', verifyToken, reviewController.createReview );
router.delete('/delete/:id', verifyToken, reviewController.delete);
router.patch('/edit/:id', verifyToken, reviewController.edit);

module.exports = router;
