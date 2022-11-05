// mongodb+srv://topper:<password>@gym.duxylq2.mongodb.net/?retryWrites=true&w=majority

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://topper:Topper123@gym.duxylq2.mongodb.net/?retryWrites=true&w=majority"
);

const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("Connected to DB");
});
conn.on("disconnected", () => {
  console.log("Disconnected to DB");
});
conn.on("error", (err) => {
  console.log("Could not Connected to DB", err);
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String,
});

const User = mongoose.model("User", userSchema);

new User({
  name: "Topper Skills",
  age: 5,
  city: "Pune",
})
  .save()
  .then((result) => {
    console.log(result);
  })
  .catch(console.error);
