const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
app.use("/books", require("./routes/bookRoutes"));
app.use("/cart", require("./routes/cartRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));