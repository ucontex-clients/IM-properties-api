const express = require('express')
const verifyToken = require('../../middleware/authMiddleware/verifyToken')
const { createBooking } = require('../../controllers/bookingController/createBooking');
const { cancelBooking } = require('../../controllers/bookingController/cancelBooking');
const { reschedule } = require('../../controllers/bookingController/rescheduleBooking');
const getBooking = require('../../controllers/bookingController/getBooking')
const router = express.Router();

router.post('/createbooking/:id', verifyToken, createBooking);
router.patch('/reschedule/:id', verifyToken, reschedule );
router.delete('/cancelbooking/:id', verifyToken, cancelBooking);
router.get('/getuserbooking', verifyToken, getBooking.getUserBooking);
router.get('/getpropertybooking/:id',verifyToken, getBooking.getPropertyBooking);

module.exports = router;