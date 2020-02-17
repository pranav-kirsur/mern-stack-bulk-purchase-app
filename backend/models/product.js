const mongoose = require('mongoose');

let Product = new mongoose.Schema({
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

module.exports = mongoose.model('Product', Product);