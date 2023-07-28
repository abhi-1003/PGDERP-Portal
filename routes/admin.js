const express = require("express");

const { auth } = require("../middleware/auth");

const { getAllStudentDetails, getStudentDocsZip, getStudentAdmin, adminDocsEdit} = require("../controllers/student");

const { loginAdmin, registerAdmin } = require("../controllers/auth");

const router = express.Router();

router.post("/loginAdmin", loginAdmin);
router.post("/adminRegister", registerAdmin);
router.get("/allStudentDetails", [auth, getAllStudentDetails]);
router.post("/zipDocs", [auth, getStudentDocsZip])
router.post("/studentIndi", [auth, getStudentAdmin])
router.post("/updateStudentDocs", [auth, adminDocsEdit])

module.exports = router;
