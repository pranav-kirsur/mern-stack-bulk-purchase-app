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

// Route for edit order
router.post("/editOrder", (req, res) => {
  let quantity = Number(req.body.quantity);
  let order_id = req.body.order_id;
  let product_id = req.body.product_id;
  console.log("request received");

  let quantityRequired = 0;
  let quantityOrdered = 0;
  Product.findById(product_id, function(err, product) {
    quantityOrdered = product.quantityOrdered;
    quantityRequired = product.quantity;
  });

  let previous_order_quantity = 0;
  Order.findById(order_id, function(err, order) {
    previous_order_quantity = order.quantity;
  });

  Order.findByIdAndUpdate(order_id, { quantity: quantity }, function(
    err,
    order
  ) {
    if (
      quantityOrdered - previous_order_quantity + quantity ===
      quantityRequired
    ) {
      Product.findByIdAndUpdate(
        product_id,
        {
          quantityOrdered:
            Number(quantityOrdered) -
            Number(previous_order_quantity) +
            Number(quantity),
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
            Number(quantityOrdered) -
            Number(previous_order_quantity) +
            Number(quantity)
        },
        function(err, product) {
          console.log("prod");
        }
      );
    }
  });
});

// Route for getbycustomerid
router.get("/getbycustomerid/:customerid", (req, res) => {
  let customerid = req.params.customerid;
  Order.find({ customer_id: customerid })
    .populate("product_id")
    .populate({ populate: "vendor_id", path: "product_id" })
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

//Route for delete by id
router.get("/deletebyid/:id", (req, res) => {
  let id = req.params.id;
  Order.findByIdAndRemove(id,function(err, prod){console.log(err);});
  res.send("Done")
});

module.exports = router;
