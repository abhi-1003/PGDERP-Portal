const Student = require("../models/student");
const Coordinator = require("../models/coordinator")
const Admin = require("../models/admin")

module.exports = {
  student: Student,
  admin: Admin,
  coordinator: Coordinator
};
