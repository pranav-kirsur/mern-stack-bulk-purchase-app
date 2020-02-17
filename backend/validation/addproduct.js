const validator = require("validator");
const isEmpty = require("is-empty");
const isPositiveInt = require("is-positive-integer")

function validateAddProductInput(data) {
  let errors = {};

  //Change empty fields into empty strings
  if (isEmpty(data.name)) {
    data.name = "";
  }
  if (isEmpty(data.price)) {
    data.price = "";
  }
  if (isEmpty(data.quantity)) {
    data.quantity = "";
  }

  //Check if name is empty
  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  //Check if price is empty
  if (validator.isEmpty(data.price)) {
    errors.price = "Price is required";
  }

  //Check if quantity is empty
  if (validator.isEmpty(data.quantity)) {
    errors.quantity = "Quantity is required";
  }

  if (!validator.isNumeric(data.price)) {
    errors.price = "Price must be a number"
  }

  if (!validator.isNumeric(data.quantity)) {
    errors.quantity = "Quantity must be a number"
  }

  if(!(isPositiveInt(Number(data.quantity))))
  {
    errors.quantity = "Quantity must be a positive integer"
  }

  if(Number(data.price) < 0)
  {
    errors.price = "Price must be non negative"
  }

  // return list of errors and whether input is validated
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateAddProductInput;
