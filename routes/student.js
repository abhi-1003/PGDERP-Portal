const express = require("express");

const {
    registerStudent,
  } = require("../controllers/auth");

const router = express.Router();

router.post("/userRegister", registerStudent);

module.exports = router;