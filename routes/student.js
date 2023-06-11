const express = require("express");

const { auth } = require("../middleware/auth");

const { registerStudent, loginStudent } = require("../controllers/auth");
const { documentsComplete,getStudentMe, personalDetails, academicDetails, professionalDetails,getApplicantsNames,getPersonalDetails,getAcademicDetails,getProfessionalDetails, getAllStudentDetails, getNoStudentsandEmailCheck, editStudentInfo, getDocs, getDocsById} = require("../controllers/student");

const router = express.Router();

router.post("/userRegister", registerStudent);
router.post("/userLogin", loginStudent);

router.post("/noStudents", getNoStudentsandEmailCheck)
router.get("/getDocs", getDocs);
router.get("/getDocsById", getDocsById);
router.post("/personalDetails",[auth, personalDetails]);
router.post("/academicDetails",[auth, academicDetails]);
router.post("/professionalDetails",[auth, professionalDetails]);
router.get("/applicants", getApplicantsNames);
router.get("/personalDetails", getPersonalDetails);
router.get("/academicDetails", getAcademicDetails);
router.get("/professionalDetails", getProfessionalDetails);
router.get("/allStudentData", [auth, getAllStudentDetails]);
router.post("/editStudentInfo", [auth, editStudentInfo]);
router.post("/me", [auth, getStudentMe])
router.post("/docFilled", [auth, documentsComplete])
module.exports = router;
