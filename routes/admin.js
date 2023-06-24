const express = require("express");

const { auth } = require("../middleware/auth");

const { getAllStudentDetails } = require("../controllers/student");

const { loginAdmin, registerAdmin } = require("../controllers/auth");

const router = express.Router();

router.post("/loginAdmin", loginAdmin);
router.post("/adminRegister", registerAdmin);
router.get("/allStudentDetails", [auth, getAllStudentDetails]);

module.exports = router;
