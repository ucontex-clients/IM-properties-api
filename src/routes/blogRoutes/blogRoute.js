const express = require('express');
const blogDetailsController = require('../../controllers/blogController/blogDetailsController');
const createBlogController = require('../../controllers/blogController/createBlogController');
const deleteBlogController = require('../../controllers/blogController/deleteBlogController');
const getAllblogsController = require('../../controllers/blogController/getAllblogsController');
const editBlogController = require('../../controllers/blogController/editBlogController');

const router = express.Router();


router.get('/', getAllblogsController);
router.post('/create-blog', createBlogController);
router.get('/:id', blogDetailsController );
router.delete('/:id', deleteBlogController);
router.put('/:id', editBlogController);

module.exports = router;