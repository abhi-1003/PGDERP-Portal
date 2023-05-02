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
    ID: {type: Number, required: require},
    course: {type: String, required: require},
    coursepreferences:{type: Array, required: require},
    lastName:{type: String, required: require},
    firstName:{type: String, required: require},
    middleName:{type: String, required: require},
    Address:{type: String, required: require},
    permanentAddress:{type: String, required: require},
    email:{type: String, required: require},
    gender:{type: String, required: require},
    phyDis:{type: String, required: require},
    number:{type: Number, required: require},
    PHname:{type: String},
    PHemail:{type: String},
    PHnumber:{type: Number},
    dob:{type: Date},
    domicileState:{type: String, required: require},
    nationality:{type: String, required: require},
  };
  
  const academics = {
    examination: {type: String, required: require},
    institute: { type: String },
    datefrom: {type: String},
    dateto: {type: String},
    percentageMarks: { type: Number },
  };
  
  const academicsUGPG = {
    examination: {type: String, required: require},
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
      othercourses: {type: Array}
    },
    { timestamps: true }
  );

StudentSchema.pre("save", preSaveHashPassword);

const Student = model("student", StudentSchema, "students");
module.exports = Student;