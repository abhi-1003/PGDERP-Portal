require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
// Connect to mongodb
const URI = process.env.MONGODB_URI;

const connectToMongoDB =  () => {
    mongoose.connect(URI)
    .then( ()=>
       console.log("Connected to MongoDB Successful")
   )
}

app.get("/", (req, res) => {
  res.send("this is pgderp portal");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});

module.exports = connectToMongoDB;