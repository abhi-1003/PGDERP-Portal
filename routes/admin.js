const express = require("express");

const { auth } = require("../middleware/auth");

const { registerAdmin, loginAdmin } = require("../controllers/auth");

const router = express.Router();

router.post("/adminRegister", registerAdmin);
router.post("/adminLogin", loginAdmin);

module.exports = router;
