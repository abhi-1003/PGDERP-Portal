const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const axios = require("axios");
const roleToModel = require("./roles");
const Student = require("../models/student");

const generateToken = (user) => {
    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      jwtSecretKey,
      {
        expiresIn: "2h",
      }
    );
    return {
      success: true,
      token: token,
    };
  };

exports.registerStudent = (req, res) => {
    const { name, email, mobile, password } = req.body;
    if (!(name, email, mobile && password)) {
      return res.status(400).json({ error: "All input is required" });
    }
    Student.findOne({ email })
      .then((old) => {
        if (old) {
          return res
            .status(409)
            .json({ error: "User Already Exist. Please Login" });
        }
        const newStudent = new Student({ name, email, mobile, password });
        newStudent
          .save()
          .then((user) => {
            req.body.userId = user._id;
            return "Successfully Registered";
          })
          .catch((err) =>
            res.status(400).json({ error: err.message })
          );
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: err.message });
      });
  };
  