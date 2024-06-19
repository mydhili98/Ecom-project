const Review = require('../Models/reviews');

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('product')
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const getReviewsByProduct = async (req, res, next) => {
  try {
    const product = req.params.productId;
    const reviews = await Review.find({ product });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const createReview = async (req, res, next) => {
  try {
    const newReview = new Review(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Deleted', deletedReview: review });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error Occurred');
  }
};

module.exports = {
  getReviews,
  getReviewsByProduct,
  createReview,
  deleteReview,
};