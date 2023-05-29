const { auth } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const {
  uploadFile,
  getFileGrid,
  removeFileGrid,
} = require("../controllers/file");

router.post("/upload", uploadFile);

router.get("/get/:filename", getFileGrid);

// router.delete("/delete/:filename", removeFileGrid);

module.exports = router;