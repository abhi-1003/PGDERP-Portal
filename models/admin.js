const { model, Schema } = require("mongoose");

const { reqString, email, preSaveHashPassword } = require("./schemaFields");

const AdminSchema = Schema(
  {
    email: email,
    mobile: { type: String },
    password: reqString,
  },
  { timestamps: true }
);

AdminSchema.pre("save", preSaveHashPassword);

const Admin = model("admin", AdminSchema, "admins");
module.exports = Admin;
