const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const axios = require("axios");
const roleToModel = require("./roles");
const Student = require("../models/student");
const Counter = require("../models/counter");
//sample data
//{"ID":"12345", "course":"PGDERP","coursePreference":["vcpde","dsa"],"lastName":"kuv","firstName":"abiu","middleName":"oil","Address":"iugwouh","permanentAddress":"ohoih","email":"a@gmail.com","gender":"iqbd","phyDis":"oubdo","number":"768768798","PHname":"hbdibqkudh","PHemail":"qydiy@khvdk.com","PHnumber":"927987298","dob":"24122002","domicileState":"maharashtra","nationality":"indian"}

// Only student can access this route
exports.personalDetails = async(req, res) => {
  if(req.userRole != "student"){
    res.status(403).json({ error: "Only student can change their details" });
  }
    const {ID,
        course,
        coursepreferences,
        lastName,
        firstName,
        middleName,
        Address,
        permanentAddress,
        email,
        gender,
        phyDis,
        number,
        PHname,
        PHemail,
        PHnumber,
        dob,
        domicileState,
        nationality,
      } = req.body;
    
    
    //const user = await Student.findById(req.userId).exec();
    const user = await Student.findOne({email}).exec();
    try{
    user.personalInfo.ID = ID;
    user.personalInfo.course = course;
    user.personalInfo.coursepreferences = coursepreferences;
    user.personalInfo.lastName = lastName;
    user.personalInfo.firstName = firstName;
    user.personalInfo.middleName = middleName;
    user.personalInfo.Address = Address;
    user.personalInfo.permanentAddress = permanentAddress;
    user.personalInfo.email = email;
    user.personalInfo.gender = gender;
    user.personalInfo.phyDis = phyDis;
    user.personalInfo.number = number;
    user.personalInfo.PHname = PHname;
    user.personalInfo.PHemail = PHemail;
    user.personalInfo.PHnumber = PHnumber;
    user.personalInfo.dob = dob;
    user.personalInfo.domicileState = domicileState;
    user.personalInfo.nationality = nationality;
    await user.save().catch((err) => {
        console.log(err);
        return res.json({ error: "couldn't save record" });
      });
      return res.json({ success: "true" });
    } catch (error) {
      res.status(400).json({ error: "request body contains invalid data!!" })
      res.status(400).json(console.log(error))
    }

  };

  // Except students all other roles can access
  exports.getApplicantsNames = async (req, res) => {
    // const email = req.query.email;
    if(req.userRole == "student"){
      res.status(403).json({ error: "Only Admin can access this data" });
    }
    const user = await Student.find({'applicationFilled':true}).sort({'pgderpId':1}).exec();
    try {
      return res.json(user);
    } catch (error) {
      res.status(400).json({ error: "request body contains invalid data!!" });
      res.status(400).json(console.log(error));
    }
  };

  exports.getPersonalDetails = async (req, res) => {
    const _id = req.query.id;
    const user = await Student.findOne({_id}).exec();
    try {
      return res.json(user.personalInfo);
    } catch (error) {
      res.status(400).json({ error: "request body contains invalid data!!" });
      res.status(400).json(console.log(error));
    }
  };

//sample data:
//   {"otherCourses":["pgderp-2","2021","2022","98"],"examinationSSC":"SSC","instituteSSC":"DAV","datefromSSC":"2017","datetoSSC":"2019","percentageMarksSSC":"97","examinationHSC":"HSC","instituteHSC":"DAV","datefromHSC":"2019","datetoHSC":"2021","percentageMarksHSC":"99","examinationDiploma":"Diploma","instituteDiploma":"DAV2","datefromDiploma":"2019","datetoDiploma":"2022","percentageMarksDiploma":"98","examinationUG":"UG","instituteUG":"COEP","specializationUG":"CSE","datefromUG":"2021","datetoUG":"2025","marksFinalYearUG":"9","totalAggregateUG":"10","percentageMarksUG":"9","totalDeadBacklogsUG":"0","totalLiveBacklogsUG":"0","examinationPG":"PG","institutePG":"MIT","specializationPG":"CSE","datefromPG":"2025","datetoPG":"2026","marksFinalYearPG":"9","totalAggregatePG":"9","percentageMarksPG":"10","totalDeadBacklogsPG":"0","totalLiveBacklogsPG":"0"}
  exports.academicDetails = async(req, res) => {
    const {otherCourses,
    // examinationSSC,
    InstituteSSC,
    SSCFrom,
    SSCTo,
    SSCmarks,
    // examinationHSC,
    InstituteHSC,
    HSCFrom,
    HSCTo,
    HSCmarks,
    // examinationDiploma,
    InstituteDiploma,
    DiplomaFrom,
    DiplomaTo,
    Diplomamarks,
    // examinationUG,
    InstituteGrad,
    SpecializationGrad,
    GradFrom,
    GradTo,
    FinalYearMarksGrad,
    AggregateMarksGrad,
    // percentageMarksUG,
    DeadBacklogsGrad,
    AliveBacklogGrad,
    // examinationPG,
    InstitutePostGrad,
    SpecializationPostGrad,
    PostGradFrom,
    PostGradTo,
    FinalYearMarksPostGrad,
    AggregateMarksPostGrad,
    // percentageMarksPG,
    DeadBacklogsPostGrad,
    AliveBacklogPostGrad,} = req.body;
    const email = "a@gmail.com"
    const user = await Student.findOne({email}).exec();
    try{
        // user.academicsInfo.examinationSSC = examinationSSC;
        user.academicsInfo.InstituteSSC = InstituteSSC;
        user.academicsInfo.SSCFrom = SSCFrom;
        user.academicsInfo.SSCTo = SSCTo;
        user.academicsInfo.SSCmarks = SSCmarks;
        // user.academicsInfo.examinationHSC = examinationHSC;
        user.academicsInfo.InstituteHSC = InstituteHSC;
        user.academicsInfo.HSCFrom = HSCFrom;
        user.academicsInfo.HSCTo = HSCTo;
        user.academicsInfo.HSCmarks = HSCmarks;
        // user.academicsInfo.examinationDiploma = examinationDiploma;
        user.academicsInfo.InstituteDiploma = InstituteDiploma;
        user.academicsInfo.DiplomaFrom= DiplomaFrom;
        user.academicsInfo.DiplomaTo = DiplomaTo;
        user.academicsInfo.Diplomamarks = Diplomamarks;
        // user.academicsInfoUGPG.examinationUG = examinationUG;
        user.academicsInfo.InstituteGrad = InstituteGrad;
        user.academicsInfo.GradFrom = GradFrom;
        user.academicsInfo.GradTo = GradTo;
        user.academicsInfo.SpecializationGrad = SpecializationGrad;
        user.academicsInfo.FinalYearMarksGrad = FinalYearMarksGrad;
        user.academicsInfo.AggregateMarksGrad = AggregateMarksGrad;
        // user.academicsInfoUGPG.percentageMarksUG = percentageMarksUG;
        user.academicsInfo.DeadBacklogsGrad = DeadBacklogsGrad;
        user.academicsInfo.AliveBacklogGrad = AliveBacklogGrad;
        // user.academicsInfoUGPG.examinationPG = examinationPG;
        user.academicsInfo.InstitutePostGrad = InstitutePostGrad;
        user.academicsInfo.PostGradFrom = PostGradFrom;
        user.academicsInfo.PostGradTo = PostGradTo;
        user.academicsInfo.SpecializationPostGrad = SpecializationPostGrad;
        user.academicsInfo.FinalYearMarksPostGrad = FinalYearMarksPostGrad;
        user.academicsInfo.AggregateMarksPostGrad = AggregateMarksPostGrad;
        // user.academicsInfoUGPG.percentageMarksPG = percentageMarksPG;
        user.academicsInfo.DeadBacklogsPostGrad = DeadBacklogsPostGrad;
        user.academicsInfo.AliveBacklogPostGrad = AliveBacklogPostGrad;
        user.othercourses = otherCourses;
        await user.save().catch((err) => {
            console.log(err);
            return res.json({ error: "couldn't save record" });
          });
          return res.json({ success: "true" });
        } catch (error) {
          res.status(400).json({ error: "request body contains invalid data" })
        }

  };

  exports.getAcademicDetails = async (req, res) => {
    // const email = "prernat20.comp@coeptech.ac.in";
    const _id = req.query.id;
    const user = await Student.findOne({_id}).exec();
    let data = {};
    try {
      if (user && user['academicsInfo'] !== undefined) {
        return res.json(user['academicsInfo'])
      } else {
        return res.json({ error: "no user found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "request failed" });
    }
  };
//Sample Data:
//{"professionalDetails":["Google","2025","2027","CEO"]} 
  exports.professionalDetails = async(req, res) => {    
    
    //const user = await Student.findById(req.userId).exec();
    const email = "a@gmail.com";
    const user = await Student.findOne({email}).exec();
    try{
    user.professionalExperience = req.body.professionalDetails;
    await user.save().catch((err) => {
        console.log(err);
        return res.json({ error: "couldn't save record" });
      });
      return res.json({ success: "true" });
    } catch (error) {
      res.status(400).json({ error: "request body contains invalid data!!" })
      res.status(400).json(console.log(error))
    }

  };

  exports.getProfessionalDetails = async(req,res) => {
    const _id = req.query.id;
    const user = await Student.findOne({_id}).exec();
    try {
      if (user) {
        if(user['academicsInfo']['professionalExperience'] !== undefined){
          return res.json(user['academicsInfo']['professionalExperience']);
        }
        return res.json([]);
      } else {
        return res.json({ error: "no user found" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "request failed" });
    }
  }

  exports.getAllStudentDetails = async(req, res) => {

    let projection = "";
      Student.find()
      .lean()
      .exec()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        res.status(400).json({ error: "invalid request" });
      });
    
    // else{
    //   return res.status(403).json("Error : Access Denied")
    // }
  }

  exports.getNoStudentsandEmailCheck = async(req, res) => {
      const {email, course} = req.body;
      Student.findOne({email}, (err, user) => {
        if(err){
          console.log(err)
          return res.status(400).json({err})
        }
        if(user){
          return res.send({"message" : "User with same email already registered"})
        }
        Student.countDocuments({"course" : course}).then((count_documents) => {
          return res.json({ data: count_documents })
        }).catch((err) => {
          console.log(err.Message);
        })
      })
  }

  exports.editStudentInfo = async(req, res) => {
    if(req.userRole == "student"){
      const fields = [
        "personalInfo",
        "academicsInfo"
      ];
      const email = req.body['email'];
      try{
        const user = await Student.findOne({email}).exec();
        for (const field of fields) {
          user[field] = req.body[field];
        }
        user['applicationFilled'] = true;
        await user.save().catch((err) => {
          console.log(err);
          return res.json({ error: "couldn't update record" });
        });
        return res.status(200).json({user})
      } catch (error) {
        res.status(400).json({ error: "request body contains invalid data" });
      }
    }
    
  }

  exports.getDocs = async(req, res) => {
    const email = req.query.email;
    try{
      const user = await Student.findOne({email}).exec();
      if(user){
        console.log(296, user)
        if(user["documents"]!==undefined){
          return res.json({"doc": user["documents"]})
        }
        else{
          return res.json({"doc": null})
        }
      }
      else{
        return res.json({"doc": null})
      }
    }
    catch (error){
      console.log(error);
      return res.status(400).json({ error: "request failed" });
    }
  }

  exports.getDocs = async(req, res) => {
    const email = req.query.email;
    try{
      const user = await Student.findOne({email}).exec();
      if(user){
        console.log(296, user)
        if(user["documents"]!==undefined){
          return res.json({"doc": user["documents"]})
        }
        else{
          return res.json({"doc": null})
        }
      }
      else{
        return res.json({"doc": null})
      }
    }
    catch (error){
      console.log(error);
      return res.status(400).json({ error: "request failed" });
    }
  }

  exports.getDocsById = async(req, res) => {
    const id = req.query.id;
    console.log(id)
    try{
      const user = await Student.findById(id).exec();
      if(user){
        console.log(296, user)
        if(user["documents"]!==undefined){
          return res.json({"doc": user["documents"]})
        }
        else{
          return res.json({"doc": null})
        }
      }
      else{
        return res.json({"doc": null})
      }
    }
    catch (error){
      console.log(error);
      return res.status(400).json({ error: "request failed" });
    }
  }