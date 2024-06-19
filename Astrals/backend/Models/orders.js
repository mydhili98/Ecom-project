const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products:[{
      type : mongoose.ObjectId,
      ref : 'Products'
    }],
    shippingAddress : {
      type : mongoose.ObjectId,
      ref : 'Address'
    },
    paymentMethod : String,
    orderStatus : {
      type : String,
      default : "pending"
    },
    user : {
      type : mongoose.ObjectId,
      ref : 'Users'
  },
  },{timestamps:true});
  const Order = mongoose.model('Order',orderSchema);

  module.exports = Order