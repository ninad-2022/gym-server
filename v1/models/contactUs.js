const { string } = require("joi");
const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  message: String,
});

module.exports = mongoose.model("contactUs", contactUsSchema);
