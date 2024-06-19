const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product : {
        type: mongoose.ObjectId,
        ref : 'Products',
        required : true
    },
    content: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
  });
  const Reviews = mongoose.model('Reviews',reviewSchema);

  module.exports = Reviews