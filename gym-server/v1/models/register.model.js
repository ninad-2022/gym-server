const { string } = require("joi");
const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  email: String,
  mobile: String,
  pack: String,
});

module.exports = mongoose.model("register", registerSchema);
