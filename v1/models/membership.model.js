const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema({
  title: String,
  price: String,
  facilites: [{ type: String }],
});

module.exports = mongoose.model("Membership", MembershipSchema);
