const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../helpers/mongooseValidators");

const Name = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  last: DEFAULT_VALIDATION,
});

module.exports = Name;
