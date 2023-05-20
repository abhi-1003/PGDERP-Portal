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
    course: {type: String},
    campusPreference1:{type: Array},
    campusPreference2:{type: Array},
    campusPreference3:{type: Array},
    lastName:{type: String},
    firstName:{type: String},
    middleName:{type: String},
    fullName: {type: String},
    postalAddress:{type: String},
    permanentAddress:{type: String},
    email:{type: String},
    gender:{type: String},
    phyDis:{type: String},
    mobileNumber:{type: Number},
    PHname:{type: String},
    PHemail:{type: String},
    PHnumber:{type: Number},
    dob:{type: Date},
    domicileState:{type: String},
    nationality:{type: String},
    caste: {type: String}
  };
  
  const academics = {
    examinationSSC: {type: String},
    instituteSSC: { type: String },
    datefromSSC: {type: String},
    datetoSSC: {type: String},
    percentageMarksSSC: { type: Number },
    examinationHSC: {type: String},
    instituteHSC: { type: String },
    datefromHSC: {type: String},
    datetoHSC: {type: String},
    percentageMarksHSC: { type: Number },
    examinationDiploma: {type: String},
    instituteDiploma: { type: String },
    datefromDiploma: {type: String},
    datetoDiploma: {type: String},
    percentageMarksDiploma: { type: Number },
  };
  
  const academicsUGPG = {
    examinationUG: {type: String},
    instituteUG: { type: String },
    specializationUG: { type: String },
    datefromUG: {type: String},
    datetoUG: {type: String},
    marksFinalYearUG: { type: Number },
    totalAggregateUG: { type: Number },
    percentageMarksUG: { type: Number },
    totalDeadBacklogsUG: {type: Number},
    totalLiveBacklogsUG: {type: Number},
    examinationPG: {type: String},
    institutePG: { type: String },
    specializationPG: { type: String },
    datefromPG: {type: String},
    datetoPG: {type: String},
    marksFinalYearPG: { type: Number },
    totalAggregatePG: { type: Number },
    percentageMarksPG: { type: Number },
    totalDeadBacklogsPG: {type: Number},
    totalLiveBacklogsPG: {type: Number},
    };
  
  const StudentSchema = Schema(
    {
      name: reqString,
      email: email,
      password: reqString,
      mobile: { type: String },
      pgderpID: {type: String},
      personalInfo: personalInfo,
      academics: academics,
      academicsUGPG: academicsUGPG,
      othercourses: {type: Array},
      professionalExperience: {type: Array},
      verificationField: verificationField,
    },
    { timestamps: true }
  );

StudentSchema.pre("save", preSaveHashPassword);

const Student = model("student", StudentSchema, "students");
module.exports = Student;