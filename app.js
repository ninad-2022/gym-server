const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./v1/models/db");

const port = process.env.PORT || 8888;
const app = express();
app.use(cors());

// for allowing access to headers
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "x-access-token,x-refresh-token");
  next();
});

app.use(express.static("uploads"));
app.use(bodyParser.json());

app.use("/api/v1/users", require("./v1/routes/user.route"));
app.use("/api/v1/auth", require("./v1/routes/auth.route"));
app.use("/api/v1/membership", require("./v1/routes/membership.route"));
app.use("/api/v1/contactus", require("./v1/routes/contactus.route"));
app.use("/api/v1/register", require("./v1/routes/register.route"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
