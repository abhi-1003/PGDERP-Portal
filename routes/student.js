const express = require("express");

const { auth } = require("../middleware/auth");

const { registerStudent, loginStudent } = require("../controllers/auth");
const { fullComplete, documentsComplete,getStudentMe, personalDetails, academicDetails, professionalDetails,getApplicantsNames,getPersonalDetails,getAcademicDetails,getProfessionalDetails, getAllStudentDetails, getNoStudentsandEmailCheck, editStudentInfo, getDocs, getDocsById, modifications, getOtherDocs, changeVerificationStatus, getCoordinatorSections, getDataByCourse, getStudent} = require("../controllers/student");

const router = express.Router();

router.post("/userRegister", registerStudent);
router.post("/userLogin", loginStudent);

router.post("/noStudents", getNoStudentsandEmailCheck)
router.get("/getDocs", getDocs);
router.get("/getDocsById", getDocsById);
router.get("/getData", getDataByCourse);
router.post("/personalDetails",[auth, personalDetails]);
router.post("/academicDetails",[auth, academicDetails]);
router.post("/professionalDetails",[auth, professionalDetails]);
router.post("/modification", modifications);
router.post("/changeVerificationStatus", changeVerificationStatus);
router.get("/applicants", getApplicantsNames);
router.get("/personalDetails", getPersonalDetails);
router.get("/academicDetails", getAcademicDetails);
router.get("/coordinatorSections", getCoordinatorSections);
router.get("/professionalDetails", getProfessionalDetails);
router.get("/otherDocs", getOtherDocs);
router.get("/allStudentData", [auth, getAllStudentDetails]);
router.post("/editStudentInfo", [auth, editStudentInfo]);
router.post("/me", [auth, getStudentMe])
router.get("/getAppData", getStudent);
router.post("/docFilled", [auth, documentsComplete])
router.post("/fullComplete", [auth, fullComplete])
module.exports = router;
