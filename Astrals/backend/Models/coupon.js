const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    couponName: String,
    discountAmount: Number,
    couponCode : String,
    expiresIn : Date
  },{timestamps : true});
  const Coupons = mongoose.model('Coupons',couponSchema);

  module.exports = Coupons