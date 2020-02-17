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
  productAttributes["status"] = "waiting"

  let product = new Product(productAttributes);
    product.save()
        .then(product => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });

});





module.exports = router;