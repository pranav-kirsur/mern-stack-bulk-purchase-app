const mongoose = require('mongoose');

let Order = new mongoose.Schema({

    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vendor_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    review: {
        type: String
    },
    rating: {
        type: number
    }

});

module.exports = mongoose.model('Order', Order);