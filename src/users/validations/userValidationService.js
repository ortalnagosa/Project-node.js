const loginValidation = require("./Joi/loginValidation");
const userUpdateValidation = require("./Joi/userUpdateValidation");
const registerValidation = require("./Joi/registerValidation");

const validator = undefined || "Joi";

const validateRegistration = (user) => {
  if (validator === "Joi") {
    return registerValidation(user);
  }
};

const validateLogin = (user) => {
  if (validator === "Joi") {
    return loginValidation(user);
  }
};

const validateUserUpdate = (user) => {
  if (validator === "Joi") {
    return userUpdateValidation(user);
  }
};



module.exports = { validateLogin, validateRegistration, validateUserUpdate };
