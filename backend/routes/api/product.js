const express = require("express");
const router = express.Router();

const validateAdditionInput = require("../../validation/addproduct");

// Load Product model
const Product = require("../../models/product");

// Route for register
router.post("/add", (req, res) => {
  //Validate input
  const { errors, isValid } = validateAdditionInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  productAttributes = req.body;
  productAttributes["status"] = "waiting";

  let product = new Product(productAttributes);
  product
    .save()
    .then(product => {
      res.status(200).json({ Product: "Product added successfully" });
    })
    .catch(err => {
      res.status(400).send("Error");
    });
});

// Route for getbystatus and vendor id
router.get("/getbystatus/:status/:vendorid", (req, res) => {
  let status = req.params.status;
  let vendorid = req.params.vendorid;
  Product.find({ status: status, vendor_id: vendorid }, function(err, product) {
    res.json(product);
  });
});

//Route for changing status of an order
router.get("/changestatusbyid/:id/:status", (req, res) => {
  let status = req.params.status;
  let id = req.params.id;
  Product.findByIdAndUpdate(id, { status: status }, function(err, product) {
    if (err) {
      res.status(400).send("Error!");
    } else {
      res.json(product);
    }
  });
});

// Route for getall
router.get("/getall", (req, res) => {
  Product.find({})
    .populate("vendor_id")
    .exec(function(err, product) {
      res.json(product);
    });
});

//Route for delete by id
router.get("/deletebyid/:id", (req, res) => {
  let id = req.params.id;
  Product.findByIdAndRemove(id, function(err, prod){console.log(err);});
  res.send("Done");
});

module.exports = router;
