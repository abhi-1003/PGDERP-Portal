const express = require("express");

const { registerStudent, loginStudent } = require("../controllers/auth");
const { personalDetails, academicDetails, professionalDetails,getApplicantsNames,getPersonalDetails,getAcademicDetails,getProfessionalDetails} = require("../controllers/student")

const router = express.Router();

router.post("/userRegister", registerStudent);
router.post("/userLogin", loginStudent);
router.post("/personalDetails",personalDetails);
router.post("/academicDetails",academicDetails);
router.post("/professionalDetails",professionalDetails);
router.get("/applicants",getApplicantsNames);
router.get("/personalDetails",getPersonalDetails);
router.get("/academicDetails",getAcademicDetails);
router.get("/professionalDetails",getProfessionalDetails);
module.exports = router;
