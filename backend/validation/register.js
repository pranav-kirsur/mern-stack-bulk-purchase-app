const validator = require("validator");
const isEmpty = require("is-empty");

function validateRegistrationInput(data) {
  let errors = {};

  //Change empty fields into empty strings
  if (isEmpty(data.username)) {
    data.username = "";
  }
  if (isEmpty(data.password)) {
    data.password = "";
  }
  if (isEmpty(data.passwordConfirm)) {
    data.passwordConfirm = "";
  }
  if (isEmpty(data.type)) {
    data.type = "";
  }

  //Check if username is empty
  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  //Check if password is empty
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  //Check if confirmation password is empty
  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm Password is required";
  }

  // Password length must be between 6 and 30 characters
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password =
      "Password must be at least 6 characters and 30 characters at the maximum";
  }

  //Check if passwords match
  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Confirmation password must match the password";
  }

  // return list of errors and whether input is validated
  return {
      errors,
      isValid: isEmpty(errors)
  };
}

module.exports = validateRegistrationInput;
