const express = require("express");
const router = express.Router();

// Load Order model
const Order = require("../../models/order");

// Load product model
const Product = require("../../models/product");

// Route for place order
router.post("/placeOrder", (req, res) => {
  let order = new Order(req.body);
  let product_id = req.body.product_id;
  console.log("request received");

  order
    .save()
    .then(order => {
      Product.findById(product_id, function(err, product) {
        console.log("here");
        if (product.quantityOrdered + req.body.quantity === product.quantity) {
          Product.findByIdAndUpdate(
            product_id,
            {
              quantityOrdered:
                Number(product.quantityOrdered) + Number(req.body.quantity),
              status: "placed"
            },
            function(err, product) {
              console.log("prod");
            }
          );
        } else {
          console.log("inside");
          Product.findByIdAndUpdate(
            product_id,
            {
              quantityOrdered:
                Number(product.quantityOrdered) + Number(req.body.quantity)
            },
            function(err, product) {
              console.log("prod");
            }
          );
        }
      });
      res.status(200).json({ Order: "Order placed successfully" });
    })
    .catch(err => {
      res.status(400).send("Error");
    });
});

// Route for getbycustomerid
router.get("/getbycustomerid/:customerid", (req, res) => {
  let customerid = req.params.customerid;
  Order.find({ customer_id: customerid })
    .populate("product_id").populate({populate : "vendor_id",path: "product_id"})
    .exec(function(err, order) {
      res.json(order);
    });
});

// Route for getall
router.get("/getall", (req, res) => {
  Order.find({}).exec(function(err, order) {
    res.json(order);
  });
});

module.exports = router;
