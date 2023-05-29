const express = require("express");

const { auth } = require("../middleware/auth");

const { registerStudent, loginStudent } = require("../controllers/auth");
const { personalDetails, academicDetails, professionalDetails,getApplicantsNames,getPersonalDetails,getAcademicDetails,getProfessionalDetails, getAllStudentDetails, getNoStudents, editStudentInfo} = require("../controllers/student");

const router = express.Router();

router.post("/userRegister", registerStudent);
router.post("/userLogin", loginStudent);

router.get("/noStudents", getNoStudents)

router.post("/personalDetails",[auth, personalDetails]);
router.post("/academicDetails",[auth, academicDetails]);
router.post("/professionalDetails",[auth, professionalDetails]);
router.get("/applicants", getApplicantsNames);
router.get("/personalDetails", getPersonalDetails);
router.get("/academicDetails", getAcademicDetails);
router.get("/professionalDetails",[auth, getProfessionalDetails]);
router.get("/allStudentData", [auth, getAllStudentDetails]);
router.post("/editStudentInfo", [auth, editStudentInfo]);
module.exports = router;
