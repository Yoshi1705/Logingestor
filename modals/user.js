const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role_id : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        required : true
    },
    last_login : {
        type : Date,
        required : true,
        default : Date.now
    },
});

const User = mongoose.model('User',userSchema);
module.exports = User;