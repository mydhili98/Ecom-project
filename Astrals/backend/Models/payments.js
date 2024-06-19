const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
 
    user : {
        type : mongoose.ObjectId,
        ref : 'user'
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true
    }
  },{timestamps:true});
  const Payment = mongoose.model('payment',paymentSchema);

  module.exports = Payment