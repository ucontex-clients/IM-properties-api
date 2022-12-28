const express = require('express');
const router = express.Router();
const espController = require('../../controllers/espControllers/espBasics');
const verifyToken = require('../../middleware/authMiddleware/verifyToken');
const verifyESP = require('../../middleware/authMiddleware/verifyESP');

router.post('/switchtoesp', verifyToken, espController.switchToEsp);

module.exports = router