const express = require("express");

const { auth } = require("../middleware/auth");

const { loginAdmin, registerAdmin } = require("../controllers/auth");

const router = express.Router();

router.post("/adminLogin", loginAdmin);
router.post("/adminRegister", registerAdmin);

module.exports = router;
