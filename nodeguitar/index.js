const express = require("express");
const mongoose = require("mongoose");
var MongoClient = require("mongodb");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./Db");
const users = require("./api/Users.js");
const guitars = require("./api/Guitars.js");
const cart = require("./api/Cart.js");

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log("Can not connect to the database----------->" + err);
  }
);
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/guitars", guitars);
app.use("/api/cart", cart);
app.get("/", function(req, res) {
  res.send("Hello Backend");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
