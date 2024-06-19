const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    name: String,
    address : String,
    phone : Number,
    pin : Number,
    user : {
        type : mongoose.ObjectId,
        ref : 'Users',
        required: true
    }

  });
  const Address = mongoose.model('Address',addressSchema);

  module.exports = Address