const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const Cart = require("./models/cartModel");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://online-bookstore-549hg7w29-bhabishamajhis-projects.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

connectDB();

app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running ");
});

app.get("/fix-cart", async (req, res) => {
  await Cart.deleteMany({ userId: "default-user" });
  res.send("Cart cleared");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});