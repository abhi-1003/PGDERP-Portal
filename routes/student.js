const express = require("express");

const { auth } = require("../middleware/auth");

const { registerStudent, loginStudent } = require("../controllers/auth");
const { personalDetails, academicDetails, professionalDetails,getApplicantsNames,getPersonalDetails,getAcademicDetails,getProfessionalDetails} = require("../controllers/student")

const router = express.Router();

router.post("/userRegister", registerStudent);
router.post("/userLogin", loginStudent);

router.post("/personalDetails",[auth, personalDetails]);
router.post("/academicDetails",[auth, academicDetails]);
router.post("/professionalDetails",[auth, professionalDetails]);
router.get("/applicants",[auth, getApplicantsNames]);
router.get("/personalDetails",[auth, getPersonalDetails]);
router.get("/academicDetails",[auth, getAcademicDetails]);
router.get("/professionalDetails",[auth, getProfessionalDetails]);
module.exports = router;
