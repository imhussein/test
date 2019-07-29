const Validator = require("validator");
const isEmpty = require("../utils/isEmpty");

module.exports = validateRegisterInput = data => {
  console.log(data);
  const errors = {};
  data.name = isEmpty(data.name) ? "" : data.name;
  data.username = isEmpty(data.username) ? "" : data.username;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.confirm_password = isEmpty(data.confirm_password)
    ? ""
    : data.confirm_password;

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!Validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "Username must be between 3 and 30";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isLength(data.password, { min: 3, max: 30 })) {
    errors.password = "Password must be between 3 and 30";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  if (!Validator.equals(data.password, data.confirm_password)) {
    errors.confirm_password = "Passwords Do not Match";
  }

  return {
    isValid: isEmpty(errors),
    errors
  };
};
