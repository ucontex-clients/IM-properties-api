const router = require('express').Router()
const getSingleUserController = require('../../controller/userController/getSingleUserController')

router.get('/:id', getSingleUserController )

module.exports = router