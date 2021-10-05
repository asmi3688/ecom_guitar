const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GuitarsSchema = new Schema({
  guitarName: String,
  guitarMake: String,
  guitarPrice: Number,
  guitarImage: String,
  guitarType: String
});
const Guitars = mongoose.model("Guitars", GuitarsSchema);
module.exports = Guitars;
