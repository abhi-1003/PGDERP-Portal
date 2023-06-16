const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const axios = require("axios");
const roleToModel = require("./roles");
const Student = require("../models/student");
const Counter = require("../models/counter");
const Coordinator = require("../models/coordinator");
//sample data
//{"ID":"12345", "course":"PGDERP","coursePreference":["vcpde","dsa"],"lastName":"kuv","firstName":"abiu","middleName":"oil","Address":"iugwouh","permanentAddress":"ohoih","email":"a@gmail.com","gender":"iqbd","phyDis":"oubdo","number":"768768798","PHname":"hbdibqkudh","PHemail":"qydiy@khvdk.com","PHnumber":"927987298","dob":"24122002","domicileState":"maharashtra","nationality":"indian"}
const courseIds = {
  'PGDERP': 'ERP',
  'PGDDSAI': 'DSAI',
  'PGDESIoT': 'ESIoT23',
  'PGDIPDD': 'IPDD23',
  'PGDIA': 'DIA23'
}
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
    const email = req.query.email;
    const coord = await Coordinator.findOne({'email': email}).exec();
    var courses = coord.courses;
    const user = await Student.find({'applicationFilled':true, "course": {$in: courses}}, {"name": 1, "registrationID": 1, "personalInfoVerified": 1, "academicsInfoVerified": 1, "professionalExperienceVerified": 1, "documentsVerified": 1, "applicationVerified": 1}).sort({'registrationID':1}).exec();
    console.log(user);
    try {
      return res.json(user);
    } catch (error) {
      res.status(400).json({ error: "request body contains invalid data!!" });
      res.status(400).json(console.log(error));
    }
  };

  exports.getPersonalDetails = async (req, res) => {
    const id = req.query.studentId;
    const user = await Student.findOne({'registrationID': id}).exec();
    try {
      // console.log(user)
      return res.json({
        'registrationId': id,
        'course': user.course,
        'campusPreference': user.personalInfo.campusPreference,
        'lastName': user.personalInfo.lastName,
        'firstName': user.personalInfo.firstName,
        'middleName': user.personalInfo.middleName,
        'postalAddress': user.personalInfo.Address,
        'permanentAddress': user.personalInfo.permanentAddress,
        'email': user.email,
        'gender': user.personalInfo.gender,
        'mobile': user.mobile,
        'phyDis': user.personalInfo.phyDis,
        'PHname': user.personalInfo.PHname,
        'PHemail': user.personalInfo.PHemail,
        'PHnumber': user.personalInfo.PHnumber,
        'dob': user.personalInfo.dob,
        'domicileState': user.personalInfo.domicileState,
        'nationality': user.personalInfo.nationality,
        'caste': user.personalInfo.caste,
        'age': user.personalInfo.age,
        'aadharPassport': user.documents.aadharPassport
      });
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
    const id = req.query.studentId;
    console.log(id)
    const user = await Student.findOne({'registrationID': id}).exec();
    console.log(user)
    let data = {};
    try {
      if (user && user['academicsInfo'] !== undefined) {
        return res.json(Object.assign({}, user['academicsInfo'], {'sscEq': user.documents.sscEq, 'hscEq': user.documents.hscEq, 'grad': user.documents.grad, 'otCourses': user.documents.otCourses}))
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
    const id = req.query.id;
    console.log(256, id)
    const user = await Student.findOne({'registrationID': id}).exec();
    try {
      if (user) {
        if(user['professionalExperience'] !== undefined){
          return res.json(Object.assign({}, {'exps': user['professionalExperience']}, {'profExp': user.documents.profExp}));
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

  exports.getOtherDocs = async(req,res) => {
    const id = req.query.id;
    console.log(id)
    const user = await Student.findOne({'registrationID': id}).exec();
    try {
      if (user) {
        if(user['professionalExperience'] !== undefined){
          return res.json({
            'selfDeclaration': user.documents.selfDeclaration,
            'feesPayment': user.documents.feesPayment
          });
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
        "academicsInfo",
        "professionalExperience",
      ];
      const id = req.body['id'];
      try{
        const user = await Student.findById(id).exec();
        for (const field of fields) {
          user[field] = req.body[field];
          if(req.body["message"] === "Personal Info Completed"){
            user["personalInfoFilled"] = true;
          }
          if(req.body["message"] === "Academics Info Completed"){
            user["academicsInfoFilled"] = true
          }
          if(req.body["message"] === "Professional Experience Completed"){
            user["professionalExperienceFilled"] = true
          }
        }
        
        await user.save().catch((err) => {
          console.log(err);
          return res.json({ error: "couldn't update record" });
        });
        if(req.body["message"] === "Personal Info Completed"){
          return res.send({message : "Personal Information Details Saved Successfully"})
        }
        if(req.body["message"] === "Academics Info Completed"){
          return res.send({message: "Academics Details Saved Successfully"})
        }
        if(req.body["message"] === "Professional Experience Completed"){
          return res.send({message: "Professional Experience Details Saved Successfully"})
        }
      } catch (error) {
        res.status(400).json({ error: "request body contains invalid data" });
      }
    }
    
  }

  exports.documentsComplete = async(req, res) => {
    if(req.userRole == "student"){
      const id = req.body['id'];
      try{
        const user = await Student.findById(id).exec();
        user["documentsFilled"] = true;
        await user.save().catch((err) => {
          console.log(err);
          return res.json({ error: "couldn't update record" });
        });
        return res.send({message : "Documents Saved Successfully"})

      }
      catch (error) {
        res.status(400).json({ error: "request body contains invalid data" });
      }
    }
  }

  exports.fullComplete = async(req,res) => {
    if(req.userRole == "student"){
      const id = req.body['id'];
      try{
        const user = await Student.findById(id).exec();
        if(user["personalInfoFilled"] && user["academicsInfoFilled"] && user["professionalExperienceFilled"] && user["documentsFilled"]){
          user["applicationFilled"] = true;
          user["personalInfoEditable"] = false;
          user["academicsInfoEditable"] = false;
          user["professionalExperienceEditable"] = false;
          user["arrayModi"] = [];
          user["documentsEditable"] = false;
          await user.save().catch((err) => {
            console.log(err);
            return res.json({ error: "couldn't update record" });
          });
          return res.send({message : "Application Submitted Successfully"})
        }
        else{
          res.send({message: "Please fill all sections!"})
        }
      }
      catch (error) {
        res.status(400).json({ error: "request body contains invalid data" });
      }
    }
  }

  // Route for getting personal data of student
  exports.getStudentMe = async(req, res) => {
    if(req.userRole == "student"){
      const id = req.body["id"]
      try{
        const user = await Student.findById(id).exec();
        return res.send({user})
      }
      catch (error) {
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
  
  exports.modifications = async(req, res) => {
    console.log(req.body)
    const id = req.body.studentId;
    const remarks = req.body.remarks;
    const type = req.body.type;
    const fields = req.body.modifications;
    const user = await Student.findOne({'registrationID': id}).exec();
    try {
      if(user){
        if(user.modifications !== undefined){
          let modifications = user.modifications;
          let flag = 0;
          for(var i = 0; i<modifications.length; i++){
            if(modifications[i].type === type){
              flag = 1;
              modifications[i].fields = fields;
              modifications[i].remarks = remarks;
              break;
            }
          }
          if(flag === 0){
            modifications.push({'type': type, 'fields': fields, 'remarks': remarks});
            user.modifications = modifications;
          }
          await user.save().catch((err)=>{
            if(err){
              console.log(504, err);
              return res.json({'status': false});
            }
            else{
              return res.json({'status': true});
            }
          })
        }
        else{
          user.modifications = [{'type': type, 'fields': fields, 'remarks': remarks}];
          await user.save().catch((err)=>{
            if(err){
              console.log(516, err);
              return res.json({'status': false})
            }
            else{
              return res.json({'status': true})
            }
          })
        }
      }
      else{
        return res.json({'status': true})
      }
    }
    catch (err) {
      console.log(530, err);
      return res.json({'status': false});
    }    
  }

  exports.changeVerificationStatus = async(req,res) => {
    const id = req.body.studentId;
    console.log(564, 'id')
    const user = await Student.findOne({'registrationID': id}).exec();
    try{
      if(user){
        const modifications = user.modifications;
        let flag = 0;
        for(i = 0; i < modifications.length; i++){
          if(Object.keys(modifications[i]).length>0){
            flag = 1;
            break;
          }
        }
        if(flag === 0){
          user.applicationVerified = true;
          await user.save().catch((err)=>{
            if(err){
              console.log(504, err);
              return res.json({'status': false});
            }
            else{
              return res.json({'status': true});
            }
          })
        }
        else{
          return res.json({'status': true})
        }
      }
      else{
        return res.json({'status': true})
      }
    }
    catch{
      return res.json({'status': false})
    }
  }