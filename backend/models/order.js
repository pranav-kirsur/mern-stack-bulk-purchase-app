const mongoose = require("mongoose");
const User = require("./user");
const Product = require("./product");

let OrderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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
    type: Number
  }
});

module.exports = Order = mongoose.model("Order", OrderSchema);
