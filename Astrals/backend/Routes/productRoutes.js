const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const productController = require('../Controllers/productController');

router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getProductList);
router.get('/:categoryId', productController.getProductsByCategory);
router.get('/item/:productId', productController.getProductById);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;