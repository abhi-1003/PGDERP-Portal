const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const axios = require("axios");
const roleToModel = require("./roles");
const Student = require("../models/student");
const Admin = require("../models/admin");
const Counter = require("../models/counter");
const Coordinator = require("../models/coordinator");
const { jwtSecretKey } = require("../config/configKeys");

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
  const { name, email, password, mobile, course, registrationID } = req.body;
  
  const personalInfoFilled = false;
  const academicsInfoFilled = false;
  const professionalExperienceFilled = false;
  const documentsFilled = false;

  const applicationFilled = false;

  const personalInfoEditable = true;
  const academicsInfoEditable = true;
  const professionalExperienceEditable = true;
  const documentsEditable = true;

  const personalInfoVerified = false;
  const academicsInfoVerified = false;
  const professionalExperienceVerified = false;
  const documentsVerified = false;
  const applicationVerified = false;

  if (!(name, email, password, mobile, course && registrationID)) {
    return res.status(400).json({ error: "All input is required" });
  }
  Student.findOne({ email })
    .then((old) => {
      if (old) {
        return res
          .status(409)
          .send({ message: "User Already Exist. Please Login" })
          .json({ error: "User Already Exist. Please Login" });
      }
      
      const newStudent = new Student({name, email, password, mobile, course, registrationID, 
                                      personalInfoFilled, academicsInfoFilled, professionalExperienceFilled, documentsFilled,
                                      applicationFilled,
                                      personalInfoEditable, academicsInfoEditable, professionalExperienceEditable, documentsEditable,
                                      personalInfoVerified, academicsInfoVerified, professionalExperienceVerified, documentsVerified, applicationVerified});
      newStudent
        .save()
        .then((user) => {
          req.body.userId = user._id;
          res.send({ message: "Successfully Registered" });
        })
        .catch((err) => res.status(400).json({ error: err.message }));
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });

};

exports.loginStudent = (req, res) => {
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password)) {
    return res.status(400).json({ error: "All input is required" });
  }
  // check if user exists
  Student.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }

      const isMatch = await compare(password, user.password);
      if (isMatch) {
        user.role = Student.modelName;
        const token = generateToken(user);
        res.send({ message: "Login Successful", token: token, data: user });
        // return res.json(token);
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Invalid Credentials" });
    });
};

exports.registerCoordinator = (req, res) => {
  // console.log(req.headers["pgderp-website-jwt"]);
  // if (1) {
  //   return res.status(403).json({ error: "Only Admin can add cooordinator" });
  // }
  console.log(117, req.body.data)
  const { name, email, mobile, password, courses } = req.body.data;
  console.log(req.body)
  if (!(name, email, mobile && password, courses)) {
    return res.status(400).json({ error: "All input is required" });
  }
  Coordinator.findOne({ email })
    .then((old) => {
      if (old) {
        return res
          .status(409)
          .send({ message: "Coordinator Already Exist. Please Login" })
          .json({ error: "Coordinator Already Exist. Please Login" });
      }
      const newCoordinator = new Coordinator({ name, email, mobile, password, courses });
      newCoordinator
        .save()
        .then((user) => {
          req.body.userId = user._id;
          res.send({ message: "Coordinator Successfully Registered" });
        })
        .catch((err) => res.status(400).json({ error: err.message }));
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

exports.loginCoordinator = (req, res) => {
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password)) {
    return res.status(400).json({ error: "All input is required" });
  }
  // check if user exists
  Coordinator.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }

      const isMatch = await compare(password, user.password);
      if (isMatch) {
        user.role = Coordinator.modelName;
        const token = generateToken(user);
        res.send({ message: "Login Successful", token: token, email: email });
        // return res.json(token);
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Invalid Credentials" });
    });
};

exports.getCoordinatorSections = (req, res) => {
  const email = req.query.email;
  try{
    const coord = Coordinator.findOne({'email': email}).exec();
    if(coord){
      return coord.courses;
    }
    else{
      return []
    }
  }
  catch(e){
    console.log(e);
    return [];
  }
}

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password)) {
    return res.status(400).json({ error: "All input is required" });
  }
  // check if user exists
  Admin.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }

      const isMatch = await compare(password, user.password);
      if (isMatch) {
        user.role = Admin.modelName;
        const token = generateToken(user);
        res.send({ message: "Login Successful", token: token });
        // return res.json(token);
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Invalid Credentials" });
    });
};

exports.registerAdmin = (req, res) => {
  const { email, mobile, password } = req.body;
  if (!(email, mobile && password)) {
    return res.status(400).json({ error: "All input is required" });
  }
  Admin.findOne({ email })
    .then((old) => {
      if (old) {
        return res
          .status(409)
          .send({ message: "Admin Already Exist. Please Login" })
          .json({ error: "Admin Already Exist. Please Login" });
      }
      const newAdmin = new Admin({ email, mobile, password });
      newAdmin
        .save()
        .then((user) => {
          req.body.userId = user._id;
          res.send({ message: "Admin Successfully Registered" });
        })
        .catch((err) => res.status(400).json({ error: err.message }));
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};
