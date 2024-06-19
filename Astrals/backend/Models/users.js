const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userName :{
        type : String,
        required: true,
        unique : true
    },
    email :{
        type : String,
        required : true,
        unique : true

    },
    password :{
        type : String,
        required : true

    },
    profilePicture : {
        type : String,
        default : "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
    },
    isAdmin : {
        type : Boolean,
        default : false
    }

  },{timestamps:true});
  const Users = mongoose.model('Users',usersSchema);

  module.exports = Users