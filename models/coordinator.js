const { model, Schema } = require("mongoose");

const { reqString, email, preSaveHashPassword } = require("./schemaFields");

const CoordinatorSchema = Schema(
  {
    name: reqString,
    email: email,
    mobile: { type: String },
    password: reqString,
  },
  { timestamps: true }
);

CoordinatorSchema.pre("save", preSaveHashPassword);

const Coordinator = model("coordinator", CoordinatorSchema, "coordinators");
module.exports = Coordinator;
