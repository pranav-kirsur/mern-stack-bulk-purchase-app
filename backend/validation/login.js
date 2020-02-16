const validator = require("validator");
const isEmpty = require("is-empty");

function validateLoginInput(data) {

  //store errors
  let errors = {}    

  //Change empty fields into empty strings
  if (isEmpty(data.username)) {
    data.username = "";
  }
  if (isEmpty(data.password)) {
    data.password = "";
  }

  //Check empty fields
  if(validator.isEmpty(data.username))
  {
    errors.username = "Username is required"
  }

  if(validator.isEmpty(password))
  {
      errors.password = "Password is required"
  }

  return {
      errors,
      isValid: isEmpty(errors)
  }

}
