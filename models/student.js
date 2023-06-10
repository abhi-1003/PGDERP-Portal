const { model, Schema } = require("mongoose");

const {
  reqString,
  email,
  preSaveHashPassword,
} = require("./schemaFields");

const verificationField = {
  type: String,
  default: "pending",
  enum: ["pending", "verified", "modification required"],
}

const personalInfo = {
    campusPreference:{type: Array},
    lastName:{type: String},
    firstName:{type: String},
    middleName:{type: String},
    Address:{type: String},
    permanentAddress:{type: String},
    gender:{type: String},
    phyDis:{type: String},
    PHname:{type: String},
    PHemail:{type: String},
    PHnumber:{type: Number},
    dob:{type: Array},
    domicileState:{type: String},
    nationality:{type: String},
    caste:{type: String},
    age: {type: Number},
  };

  const academicsInfo = {
    DiplomaFilled: {type: Boolean},
    DroptoGrad: {type: Number},
    GradPeriod: {type: Number},
    GradtoPostGrad: {type: Number},
    HSCFilled : {type: Boolean},
    HSCtoDiploma: {type: Number},
    SSCtoDiploma: {type: Number},
    SSCtoHSC: {type: Number},
    InstituteSSC:{type: String},
    InstituteHSC:{type: String},
    SSCFrom:{type: Array},
    HSCFrom:{type: Array},
    SSCTo:{type: Array},
    HSCTo:{type: Array},
    SSCmarks:{type: String},
    HSCmarks:{type: String},
    InstituteDiploma:{type: String},
    DiplomaFrom:{type: Array},
    DiplomaTo:{type: Array},
    Diplomamarks:{type: String},
    InstituteGrad:{type: String},
    SpecializationGrad:{type: String},
    GradFrom:{type: Array},
    GradTo:{type: Array},
    FinalYearMarksGrad:{type: String},
    AggregateMarksGrad:{type: String},
    DeadBacklogsGrad:{type: String},
    AliveBacklogGrad:{type: String},
    InstitutePostGrad:{type: String},
    SpecializationPostGrad:{type: String},
    PostGradFrom:{type: Array},
    PostGradTo:{type: Array},
    FinalYearMarksPostGrad:{type: String},
    AggregateMarksPostGrad:{type: String},
    DeadBacklogsPostGrad:{type: String},
    AliveBacklogPostGrad:{type: String},
    otherCourses:{type: Array},
    professionalExperience: {type: Array},
  }
  
  const documents = {
    sscEq: { type: String },
    hscEq: { type: String },
    grad: { type: String },
    aadharPassport: { type: String },
    profExp: { type: String },
    otCourses: { type: String },
    selfDeclaration: { type: String },
  }
  const StudentSchema = Schema(
    {

      // Important details - Name, Email, PWD, Mobile, Course
      name: reqString,
      email: email,
      password: reqString,
      mobile: { type: String },
      course: {type: String},
      registrationID: {type: String},

      // Other Info Details
      personalInfo: personalInfo,
      academicsInfo: academicsInfo,
      professionalExperience: {type: Array},
      documents: documents,

      // Filling details
      personalInfoFilled : {type: Boolean},
      academicsInfoFilled : {type: Boolean},
      professionalExperienceFilled: {type: Boolean},
      documentsFilled : {type: Boolean},

      // After filling all 4 details above it will become true and student can download
      applicationFilled : {type: Boolean},

      // Editable (after whole application is filled none of the fields will be editable)
      personalInfoEditable : {type: Boolean},
      academicsInfoEditable : {type: Boolean},
      professionalExperienceEditable : {type: Boolean},
      documentsEditable : {type: Boolean},

      // Verification
      // 3 states - Pending, Modification Required, Verified
      personalInfoVerified : {type: Boolean},
      academicsInfoVerified: {type: Boolean},
      professionalExperienceVerified : {type: Boolean},
      documentsVerified : {type:Boolean},
      applicationVerified : {type: Boolean},

      // Remarks
      personalInfoRemarks : {type: Object},
      academicsInfoRemarks : {type: Object},
      professionalExperienceRemarks : {type: Object},
      documentsRemarks : {type: Object},
      
    },
    { timestamps: true }
  );

StudentSchema.pre("save", preSaveHashPassword);

const Student = model("student", StudentSchema, "students");
module.exports = Student;