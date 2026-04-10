
const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      title: String,
      quantity: { type: Number, default: 1 },
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
