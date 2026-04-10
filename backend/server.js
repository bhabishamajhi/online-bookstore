const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/test", (req, res) => {
  res.send("Test route working ✅");
});

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));