const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    title : String,
    category: {
      type : mongoose.ObjectId,
      ref : 'Categories'
    },
    mrp : Number,
    quantity : {
      type : Number,
      default : 1
    },
    description : String
  });
  const Products = mongoose.model('Products',productSchema);

  module.exports = Products