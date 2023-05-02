const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Routers
const studentRouter = require("./routes/student");

//Connect to mongodb
connectDB();

app.use("/students", studentRouter);

app.get("/", (req, res) => {
  res.send("this is pgderp portal");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
