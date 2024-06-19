const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const categoryController = require('../Controllers/categoryController');

router.get('/', categoryController.getCategoryList);
router.post('/', upload.single('image'), categoryController.createCategory);
router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;