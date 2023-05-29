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
    ID: {type: String},
    course: {type: String},
    campusPreference:{type: Array},
    lastName:{type: String},
    firstName:{type: String},
    middleName:{type: String},
    Address:{type: String},
    permanentAddress:{type: String},
    email:{type: String},
    gender:{type: String},
    phyDis:{type: String},
    number:{type: Number},
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
  
  // const academics = {
  //   examinationSSC: {type: String},
  //   instituteSSC: { type: String },
  //   datefromSSC: {type: String},
  //   datetoSSC: {type: String},
  //   percentageMarksSSC: { type: Number },
  //   examinationHSC: {type: String},
  //   instituteHSC: { type: String },
  //   datefromHSC: {type: String},
  //   datetoHSC: {type: String},
  //   percentageMarksHSC: { type: Number },
  //   examinationDiploma: {type: String},
  //   instituteDiploma: { type: String },
  //   datefromDiploma: {type: String},
  //   datetoDiploma: {type: String},
  //   percentageMarksDiploma: { type: Number },
  // };
  
  // const academicsUGPG = {
  //   examinationUG: {type: String},
  //   instituteUG: { type: String },
  //   specializationUG: { type: String },
  //   datefromUG: {type: String},
  //   datetoUG: {type: String},
  //   marksFinalYearUG: { type: Number },
  //   totalAggregateUG: { type: Number },
  //   percentageMarksUG: { type: Number },
  //   totalDeadBacklogsUG: {type: Number},
  //   totalLiveBacklogsUG: {type: Number},
  //   examinationPG: {type: String},
  //   institutePG: { type: String },
  //   specializationPG: { type: String },
  //   datefromPG: {type: String},
  //   datetoPG: {type: String},
  //   marksFinalYearPG: { type: Number },
  //   totalAggregatePG: { type: Number },
  //   percentageMarksPG: { type: Number },
  //   totalDeadBacklogsPG: {type: Number},
  //   totalLiveBacklogsPG: {type: Number},
  //   };
  
  const StudentSchema = Schema(
    {
      name: reqString,
      email: email,
      password: reqString,
      mobile: { type: String },
      personalInfo: personalInfo,
      academicsInfo: academicsInfo,
      // academics: academics,
      // academicsUGPG: academicsUGPG,
      // othercourses: {type: Array},
      // professionalExperience: {type: Array},
      verificationField: verificationField,
      pgderpID: {type: String},
      applicationFilled : {type: Boolean},
    },
    { timestamps: true }
  );

StudentSchema.pre("save", preSaveHashPassword);

const Student = model("student", StudentSchema, "students");
module.exports = Student;