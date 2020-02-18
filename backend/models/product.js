const mongoose = require('mongoose');
const User =    require('./user')

let ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["waiting", "placed", "dispatched", "cancelled"]

    },
    quantityOrdered: {
        type: Number,
        default: 0

    },
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Product = mongoose.model('Product', ProductSchema);