const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["customer", "vendor"]
    },
    rating: {
        type: Number
    }

});

module.exports = User = mongoose.model('User', UserSchema);