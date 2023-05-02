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
    name: {type: String},
    email: {type: String},
    mobile: { type: String },
    ID: {type: Number},
    course: {type: String},
    coursepreferences:{type: Array},
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
    dob:{type: Date},
    domicileState:{type: String},
    nationality:{type: String},
  };
  
  const academics = {
    examination: {type: String},
    institute: { type: String },
    datefrom: {type: String},
    dateto: {type: String},
    percentageMarks: { type: Number },
  };
  
  const academicsUGPG = {
    examination: {type: String},
    institute: { type: String },
    specialization: { type: String },
    datefrom: {type: String},
    dateto: {type: String},
    marksFinalYear: { type: Number },
    totalAggregate: { type: Number },
    percentageMarks: { type: Number },
    totalDeadBacklogs: {type: Number},
    totalLiveBacklogs: {type: Number},
  };
  
  const StudentSchema = Schema(
    {
      name: reqString,
      email: email,
      password: reqString,
      mobile: { type: String },
      personalInfo: personalInfo,
      academics: academics,
      academicsUGPG: academicsUGPG,
      othercourses: {type: Array},
      verificationField: verificationField,
    },
    { timestamps: true }
  );

StudentSchema.pre("save", preSaveHashPassword);

const Student = model("student", StudentSchema, "students");
module.exports = Student;