require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
//Connect to mongodb
const URI = "mongodb+srv://pgderp:awzbDZdWIl1NqHZ0@cluster0.sgdemns.mongodb.net/?retryWrites=true&w=majority"; //process.env.MONGO_URI;

const connectToMongoDB =  () => {
    mongoose.connect(URI)
    .then( ()=>
       console.log("Connected to MongoDB Successful")
   )
}

app.get("/", (req, res) => {
  res.send("this is pgderp portal");
});
app.post("http://localhost:3000/Register", function(req,res){
  console.log("hello");
})
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});

module.exports = connectToMongoDB;