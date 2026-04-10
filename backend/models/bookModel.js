const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  category: String,
  stock: Number,
  rating: Number
});

module.exports = mongoose.model("Book", bookSchema);