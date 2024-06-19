const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    image: String,
    title : String,
  });
  const Categories = mongoose.model('Categories',categorySchema);

  module.exports = Categories