const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/reviewController');


router.get('/', reviewController.getReviews);
router.get('/product/:productId', reviewController.getReviewsByProduct);
router.post('/', reviewController.createReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
