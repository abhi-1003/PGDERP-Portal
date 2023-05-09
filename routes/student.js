const express = require("express");

const { registerStudent, loginStudent } = require("../controllers/auth");
const { personalDetails, academicDetails, professionalDetails} = require("../controllers/student")

const router = express.Router();

router.post("/userRegister", registerStudent);
router.post("/userLogin", loginStudent);
router.post("/personalDetails",personalDetails);
router.post("/academicDetails",academicDetails);
router.post("/professionalDetails",professionalDetails);
module.exports = router;
