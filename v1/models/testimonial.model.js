const mongoose = require("mongoose");

// schema
const TestimonialSchema = new mongoose.Schema({
  name: String,
  age: Number,
  designation: String,
  image: String,
  description: String,
});

module.exports = mongoose.model("testimonial", TestimonialSchema);
