const { auth } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const {
  uploadFile,
  getFileGrid,
  removeFileGrid,
  setUser,
  getFileId
} = require("../controllers/file");

router.post("/upload", uploadFile);
router.post("/setUser", setUser);
router.get("/get/:filename", getFileGrid);
router.post("/removeFiles/:filename", removeFileGrid);
router.get("/fileId/:filename", getFileId)

// router.delete("/delete/:filename", removeFileGrid);

module.exports = router;