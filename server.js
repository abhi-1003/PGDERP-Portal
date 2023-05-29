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
const coordinatorRouter = require("./routes/coordinator");
const adminRouter = require("./routes/admin");
const fileRouter = require("./routes/files");

//Connect to mongodb
connectDB();

app.use("/student", studentRouter);
app.use("/coordinator", coordinatorRouter)
app.use("/admin", adminRouter)
app.use("/files", fileRouter);

app.get("/", (req, res) => {
  res.send("this is pgderp portal");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port", port);
});
