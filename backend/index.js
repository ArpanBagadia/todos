// backend/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./dbconfig"); // ✅ Import db config

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
connectDB();

let routes = require("./routes/userRoutes");
app.use("/user", routes);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`server start at ${process.env.PORT}`);
  } else {
    console.log(err);
  }
});
