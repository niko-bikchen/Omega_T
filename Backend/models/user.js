var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: Number,
    user_name: String,
    user_email: String,
    user_password: String
});

module.exports = mongoose.model('User', userSchema);