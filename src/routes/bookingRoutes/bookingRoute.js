const express = require('express')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const { createBooking } = require('../../controllers/bookingController/createBooking');
const { cancelBooking } = require('../../controllers/bookingController/cancelBooking');
const { reschedule } = require('../../controllers/bookingController/rescheduleBooking');
const router = express.Router();

router.post('/createbooking', verifyToken, createBooking);
router.patch('/reschedule/:id', verifyToken, reschedule );
router.delete('/cancelbooking/:id', verifyToken, cancelBooking);

module.exports = router;