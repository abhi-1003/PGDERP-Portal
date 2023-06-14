import {
  Stepper,
  StepLabel,
  Step,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";
import { nanoid } from "nanoid";
import React, { Component } from "react";
import dataa from "./steps/data.json";
import PropTypes from "prop-types";
import { Styles } from "./common/styles";
import Step2b from "./steps/form_table";
import Step1 from "./steps/SStep";
import Step2 from "./steps/Step2";
// import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

import { BACKEND_URL } from "../config";
import axios from "axios";
// import Step2b from "./steps/form_table";
import {
  renderButton,
  renderInputText,
  renderText
} from "./common/displayComponents";
import Finished from "./steps/Finished";
import { useState } from "react";
import dayjs from "dayjs";

class FormComponent extends Component {
  state = {
    data: {
      ID: localStorage.getItem("pgderpID"),
      course: "PGDERP",
      campusPreference1: "",
      campusPreference2: "",
      campusPreference3: "",
      lastName: "",
      firstName: "",
      middleName: "",
      Address: "",
      permanentAddress: "",
      email: localStorage.getItem("email"),
      gender: "",
      phyDis: "",
      number: "",
      PHname: "",
      PHemail: "",
      PHnumber: "",
      dob: "",
      domicileState: "",
      nationality: "",
      caste: "",
      InstituteSSC: "",
      InstituteHSC: "",
      SSCTo: "",
      HSCTo: "",
      SSCFrom: "",
      HSCFrom: "",
      SSCmarks: "",
      HSCmarks: "",
      InstituteDiploma: "",
      DiplomaTo: "",
      DiplomaFrom: "",
      Diplomamarks: "",
      InstituteGrad: "",
      SpecializationGrad: "",
      GradFrom: "",
      GradTo: "",
      FinalYearMarksGrad: "",
      AggregateMarksGrad: "",
      DeadBacklogsGrad: "0",
      AliveBacklogGrad: "0",
      InstitutePostGrad: "",
      SpecializationPostGrad: "",
      PostGradFrom: "",
      PostGradTo: "",
      FinalYearMarksPostGrad: "",
      AggregateMarksPostGrad: "",
      DeadBacklogsPostGrad: "0",
      AliveBacklogPostGrad: "0",
      otherCourses: [],
      professionalExperience: []
    },
    errors: {},
    currentStep: 0,
    SSCtoHSC: 0,
    SSCtoDiploma: 0,
    HSCtoDiploma: 0,
    totalgaps: 0,
    DroptoGrad: 0,
    GradPeriod: 0,
    GradtoPostGrad: 0,
    age: 0,
    HSCFilled: false,
    DiplomaFilled: false,
    noneFilled: false,
    documentsUploaded: []
  };

  render() {
    const { classes } = this.props;
    //

    //
    const handleChangePreferences = event => {
      const {
        target: { value }
      } = event;
      const { data, errors } = this.state;
      // setPersonName(
      //   // On autofill we get a stringified value.
      //   typeof value === 'string' ? value.split(',') : value,
      // );
      //   var coursePreference;

      // console.log(value);
      data["campusPreference"] =
        typeof value === "string" ? value.split(",") : value;
      if (value.length !== 3) {
        errors["campusPreference"] = "Select 3 preferences";
      } else if (
        value[0] === value[1] ||
        value[1] === value[2] ||
        value[0] === value[2]
      ) {
        errors["campusPreference"] = "All 3 preferences must be different";
      } else {
        errors["campusPreference"] = "";
      }
      this.setState({ data, errors });
    };

    const today = dayjs();

    const otherCoursesChange = value => {
      this.state.otherCourses = value;
    };

    const professionalExperienceChange = value => {
      this.state.professionalExperience = value;
    };

    const handleOnChangeDate = (name, value) => {
      const { data, errors } = this.state;
      // console.log(name)
      // console.log(today.$y - value.$y);
      if (name === "dob") {
        this.state.age = today.$y - value.$y;
      }
      if (name === "HSCFrom") {
        this.state.SSCtoHSC = value.$y - this.state.data.SSCTo[2];
      }
      if (name === "DiplomaFrom") {
        this.state.SSCtoDiploma = value.$y - this.state.data.SSCTo[2];
      }
      if (name === "DiplomaFrom" && this.state.data.HSCTo !== []) {
        this.state.HSCtoDiploma = value.$y - this.state.data.HSCTo[2];
      }

      let a = 0;
      let b = 0;
      let c = 0;

      if (this.state.SSCtoHSC && isNaN(this.state.SSCtoHSC) == false) {
        a = this.state.SSCtoHSC;
      }
      if (this.state.SSCtoDiploma && isNaN(this.state.SSCtoDiploma) == false) {
        b = this.state.SSCtoDiploma;
      }
      if (this.state.HSCtoDiploma && isNaN(this.state.HSCtoDiploma) == false) {
        c = this.state.HSCtoDiploma;
      }

      // console.log(this.state.data.SSCTo, this.state.data.HSCTo, this.state.data.DiplomaTo)
      if (
        this.state.data.SSCFrom &&
        this.state.data.HSCFrom &&
        this.state.data.DiplomaFrom
      ) {
        this.state.totalgaps = a + c;
      } else if (this.state.data.SSCFrom && this.state.HSCFrom) {
        this.state.totalgaps = a;
      } else if (this.state.data.SSCFrom && this.state.data.DiplomaFrom) {
        this.state.totalgaps = b;
      }

      // console.log(this.state.SSCtoHSC, this.state.SSCtoDiploma, this.state.HSCtoDiploma, this.state.totalgaps)
      if (name === "GradFrom") {
        if (this.state.data.DiplomaTo === []) {
          this.state.DroptoGrad = value.$y - this.state.data.HSCTo[2];
        } else {
          this.state.DroptoGrad = value.$y - this.state.data.DiplomaTo[2];
        }
      }
      // console.log("hiii")
      if (name === "GradTo") {
        this.state.GradPeriod = value.$y - this.state.data.GradFrom[2];
        // console.log(value.$y, this.state.data.GradFrom)
      }
      if (name === "PostGradFrom") {
        this.state.GradtoPostGrad = value.$y - this.state.data.GradTo[2];
      }
      data[name] = [value.$D, value.$M + 1, value.$y];
      // console.log(data[name]);
      // data[target.name] = target.value;
      // console.log("run")
      // console.log(name.name);
      // console.log(value);
      this.setState({ data, errors });
    };
    const validateEmail = email => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const handleOnChange = ({ target }) => {
      // console.log(target.name, "changed");
      const { data, errors } = this.state;
      target.value.length <= 0
        ? (errors[target.name] = `${target.name} cannot be an empty field`)
        : (errors[target.name] = "");

      if (target.name === "ID") {
        // console.log(target.value);
      } else if (target.name === "course") {
        // console.log(target.value);
      } else if (target.name === "email") {
        !validateEmail(target.value)
          ? (errors[target.name] = "Enter a valid email address")
          : (errors[target.name] = "");
      } else if (target.name === "email") {
        !validateEmail(target.value)
          ? (errors[target.name] = "Enter a valid email address")
          : (errors[target.name] = "");
      } else if (target.name === "PHemail") {
        !validateEmail(target.value)
          ? (errors[target.name] = "Enter a valid email address")
          : (errors[target.name] = "");
      } else if (target.name === "number") {
        target.value.length !== 10
          ? (errors[target.name] = "Enter a valid phone number")
          : (errors[target.name] = "");
      } else if (target.name === "PHnumber") {
        target.value.length !== 10
          ? (errors[target.name] = "Enter a valid 10 digit phone number")
          : (errors[target.name] = "");
      }

      data[target.name] = target.value;
      this.setState({ data, errors });
    };

    const handleOnClick = ({ target }) => {};

    const handleSubmit = e => {
      const { data, errors } = this.state;
      e.preventDefault();
      // console.log(data);

      const personalInfo = {
        ID: data.ID,
        course: data.course,
        campusPreference: [
          data.campusPreference1,
          data.campusPreference2,
          data.campusPreference3
        ],
        lastName: data.lastName,
        firstName: data.firstName,
        middleName: data.middleName,
        Address: data.Address,
        permanentAddress: data.permanentAddress,
        email: data.email,
        gender: data.gender,
        phyDis: data.phyDis,
        number: data.number,
        PHname: data.PHname,
        PHemail: data.PHemail,
        PHnumber: data.PHnumber,
        dob: data.dob,
        domicileState: data.domicileState,
        nationality: data.nationality,
        caste: data.caste
      };

      const academicsInfo = {
        InstituteSSC: data.InstituteSSC,
        InstituteHSC: data.InstituteHSC,
        SSCFrom: data.SSCFrom,
        SSCTo: data.SSCTo,
        HSCFrom: data.HSCFrom,
        HSCTo: data.HSCTo,
        SSCmarks: data.SSCmarks,
        HSCmarks: data.HSCmarks,
        InstituteDiploma: data.InstituteDiploma,
        DiplomaFrom: data.DiplomaFrom,
        DiplomaTo: data.DiplomaTo,
        Diplomamarks: data.Diplomamarks,
        InstituteGrad: data.InstituteGrad,
        SpecializationGrad: data.SpecializationGrad,
        GradFrom: data.GradFrom,
        GradTo: data.GradTo,
        FinalYearMarksGrad: data.FinalYearMarksGrad,
        AggregateMarksGrad: data.AggregateMarksGrad,
        DeadBacklogsGrad: data.DeadBacklogsGrad,
        AliveBacklogGrad: data.AliveBacklogGrad,
        InstitutePostGrad: data.InstitutePostGrad,
        SpecializationPostGrad: data.SpecializationPostGrad,
        PostGradFrom: data.PostGradFrom,
        PostGradTo: data.PostGradTo,
        FinalYearMarksPostGrad: data.FinalYearMarksPostGrad,
        AggregateMarksPostGrad: data.AggregateMarksPostGrad,
        DeadBacklogsPostGrad: data.DeadBacklogsPostGrad,
        AliveBacklogPostGrad: data.AliveBacklogPostGrad,
        otherCourses: data.otherCourses
      };

      const email = localStorage.getItem("email");
      const url = BACKEND_URL + "/student/editStudentInfo";
      const body = {
        email: email,
        personalInfo: personalInfo,
        academicsInfo: academicsInfo
      };
      axios.post(url, body).then(res => {
        alert(res.data.message);
      });
    };

    const handleNext = () => {
      const { data, errors } = this.state;
      let step = this.state.currentStep;
      let DiplomaFilled = this.state.DiplomaFilled;
      let HSCFilled = this.state.HSCFilled;
      let noneFilled = this.state.noneFilled;

      let goToNext = true;
      if (!validateEmail(data.email) && step === 0) {
        goToNext = false;
        errors["email"] = "Enter a valid email address";
        // console.log("2");
      }
      if (!validateEmail(data.PHemail) && step === 0) {
        goToNext = false;
        errors["PHemail"] = "Enter a valid email address";
        // console.log("3");
      }
      if (data.number.length !== 10 && step === 0) {
        goToNext = false;
        errors["number"] = "Enter a valid phone number";
        // console.log("4");
      }
      if (data.PHnumber.length !== 10 && step === 0) {
        goToNext = false;
        errors["PHnumber"] = "Enter a valid phone number";
        // console.log("5");
      }
      if (step === 0) {
        data.campusPreference === ""
          ? (errors["campusPreference"] = "Enter a valid campus preference")
          : (errors["campusPreference"] = "");
        data.course === ""
          ? (errors["course"] = "Enter a valid course")
          : (errors["course"] = "");
        data.firstName === ""
          ? (errors["firstName"] = "Enter a valid first name")
          : (errors["firstName"] = "");
        data.middleName === ""
          ? (errors["middleName"] = "Enter a valid middle name")
          : (errors["middleName"] = "");
        data.lastName === ""
          ? (errors["lastName"] = "Enter a valid last name")
          : (errors["lastName"] = "");
        data.Address === ""
          ? (errors["Address"] = "Enter a valid address")
          : (errors["Address"] = "");
        data.permanentAddress === ""
          ? (errors["permanentAddress"] = "Enter a valid address")
          : (errors["permanentAddress"] = "");
        data.gender === ""
          ? (errors["gender"] = "Select a gender")
          : (errors["gender"] = "");
        data.PHname === ""
          ? (errors["PHname"] = "Enter a valid name")
          : (errors["PHname"] = "");
        data.domicileState === ""
          ? (errors["domicileState"] = "Enter a valid domicile state")
          : (errors["domicileState"] = "");
        data.nationality === ""
          ? (errors["nationality"] = "Enter a valid nationality")
          : (errors["nationality"] = "");
        // console.log("6");
      }
      // console.log(data.SSCTo.length, data.SSCFrom.length, data.SSCTo.length !== 3, isNaN(data.SSCFrom),)
      // Educational Details Validation
      if (data.InstituteSSC.length <= 0 && step === 1) {
        errors["InstituteSSC"] = "Enter a valid institute";
        goToNext = false;
      }
      if (
        (data.SSCTo.length !== 3 || data.SSCFrom.length !== 3) &&
        step === 1
      ) {
        errors["SSCTo"] = "Enter a valid year";
        errors["SSCFrom"] = "Enter a valid year";
        goToNext = false;
      }
      if (
        (Number(data.SSCmarks) > 100 || Number(data.SSCmarks) < 35) &&
        step === 1
      ) {
        errors["SSCmarks"] = "Enter valid percentage";
        goToNext = false;
      }

      if (data.InstituteHSC.length <= 0 && step === 1) {
        errors["InstituteHSC"] = "Enter a valid institute";
        goToNext = false;
      }

      if (
        (data.HSCTo.length !== 3 ||
          data.HSCFrom.length !== 3 ||
          isNaN(data.HSCFrom) ||
          isNaN(data.HSCTo) ||
          Number(data.HSCmarks) > 100 ||
          Number(data.HSCmarks) < 35) &&
        step === 1
      ) {
        // errors["InstituteHSC"] = "Enter a valid institute";
        if (data.HSCFrom.length !== 3) {
          errors["HSCFrom"] = "Enter a valid year";
        }
        if (data.HSCTo.length !== 3) {
          errors["HSCTo"] = "Enter a valid year";
        }
        if (
          (Number(data.HSCmarks) > 100 || Number(data.HSCmarks) < 35) &&
          step === 1
        ) {
          errors["HSCmarks"] = "Enter valid percentage";
          goToNext = false;
        }
      } else {
        let HSCFilled = this.state.HSCFilled;
        HSCFilled = true;
        this.setState({ HSCFilled });
      }

      if (
        (data.DiplomaTo.length !== 3 ||
          data.DiplomaFrom.length !== 3 ||
          isNaN(data.DiplomaFrom) ||
          isNaN(data.DiplomaTo) ||
          Number(data.Diplomamarks) > 100 ||
          Number(data.Diplomamarks) < 35) &&
        step === 1
      ) {
        if (!HSCFilled) {
          if (data.InstituteDiploma === "") {
            errors["InstituteDiploma"] = "Enter a valid institute";
          } else {
            errors["InstituteDiploma"] = "";
          }
        } else {
          errors["InstituteDiploma"] = "";
        }

        if (data.DiplomaFrom.length !== 3) {
          errors["DiplomaFrom"] = "Enter a valid year";
        }
        if (data.DiplomaTo.length !== 3) {
          errors["DiplomaTo"] = "Enter a valid year";
        }
        if (
          (Number(data.Diplomamarks) > 100 || Number(data.Diplomamarks) < 35) &&
          step === 1
        ) {
          errors["Diplomamarks"] = "Enter valid percentage";
          goToNext = false;
        }
      } else {
        let DiplomaFilled = this.state.DiplomaFilled;
        DiplomaFilled = true;
        this.setState({ DiplomaFilled });
      }

      if ((HSCFilled && DiplomaFilled) || (!HSCFilled && !DiplomaFilled)) {
        goToNext = false;
        !HSCFilled || !DiplomaFilled
          ? (noneFilled = true)
          : (noneFilled = false);
      } else {
        goToNext = true;
      }

      // GRAD VALIDATION
      if (step === 1) {
        data.InstituteGrad === ""
          ? (errors["InstituteGrad"] = "Enter a valid Institute")
          : (errors["InstituteGrad"] = "");
        data.SpecializationGrad === ""
          ? (errors["SpecializationGrad"] = "Enter a valid Specialization")
          : (errors["SpecializationGrad"] = "");
        data.GradFrom.length !== 3
          ? (errors["GradFrom"] = "Enter a valid year")
          : (errors["GradFrom"] = "");
        data.GradTo.length !== 3
          ? (errors["GradTo"] = "Enter a valid year")
          : (errors["GradTo"] = "");
        data.AliveBacklogGrad < 0 ||
        isNaN(data.AliveBacklogGrad) ||
        data.AliveBacklogGrad == ""
          ? (errors["AliveBacklogGrad"] =
              "Enter a valid number of alive backlogs")
          : (errors["AliveBacklogGrad"] = "");
        data.DeadBacklogsGrad < 0 ||
        isNaN(data.DeadBacklogsGrad) ||
        data.DeadBacklogsGrad == ""
          ? (errors["DeadBacklogsGrad"] =
              "Enter a valid number of dead backlogs")
          : (errors["DeadBacklogsGrad"] = "");
        Number(data.FinalYearMarksGrad) > 100 ||
        Number(data.FinalYearMarksGrad) < 35
          ? (errors["FinalYearMarksGrad"] = "Enter valid percentage")
          : (errors["FinalYearMarksGrad"] = "");
        Number(data.AggregateMarksGrad) > 100 ||
        Number(data.AggregateMarksGrad) < 35
          ? (errors["AggregateMarksGrad"] = "Enter a valid percentage")
          : (errors["AggregateMarksGrad"] = "");
      }
      // POST GRAD VALIDATION (not required)
      if (step === 1) {
        data.PostGradFrom.length !== 3 && data.PostGradFrom.length !== 0
          ? (errors["PostGradFrom"] = "Enter a valid year")
          : (errors["PostGradFrom"] = "");
        data.PostGradTo.length !== 3 && data.PostGradTo.length !== 0
          ? (errors["PostGradTo"] = "Enter a valid year")
          : (errors["PostGradTo"] = "");

        data.AliveBacklogPostGrad < 0 ||
        isNaN(data.AliveBacklogPostGrad) ||
        data.AliveBacklogPostGrad == ""
          ? (errors["AliveBacklogPostGrad"] =
              "Enter a valid number of alive backlogs")
          : (errors["AliveBacklogPostGrad"] = "");
        data.DeadBacklogsPostGrad < 0 ||
        isNaN(data.DeadBacklogsPostGrad) ||
        data.DeadBacklogsPostGrad == ""
          ? (errors["DeadBacklogsPostGrad"] =
              "Enter a valid number of dead backlogs")
          : (errors["DeadBacklogsPostGrad"] = "");

        Number(data.FinalYearMarksPostGrad) > 100 ||
        (Number(data.FinalYearMarksPostGrad) < 35 &&
          Number(data.FinalYearMarksPostGrad) !== 0)
          ? (errors["FinalYearMarksPostGrad"] = "Enter valid percentage")
          : (errors["FinalYearMarksPostGrad"] = "");

        Number(data.AggregateMarksPostGrad) > 100 ||
        (Number(data.AggregateMarksPostGrad) < 35 &&
          Number(data.AggregateMarksPostGrad) !== 0)
          ? (errors["AggregateMarksPostGrad"] = "Enter valid percentage")
          : (errors["AggregateMarksPostGrad"] = "");
      }
      for (const property in this.state.errors) {
        this.state.errors[property];
        let props = [
          "HSCInstitute",
          "HSCFrom",
          "HSCTo",
          "HSCMarks",
          "DiplomaInstitute",
          "DiplomaFrom",
          "DiplomaTo",
          "Diplomamarks"
        ];

        if (this.state.errors[property] !== "" && !props.includes(property)) {
          // console.log(property);
          goToNext = false;
          break;
        } else {
          goToNext = true;
        }
      }

      this.setState({ data, errors });
      // console.log(errors);
      if (goToNext) {
        let { currentStep } = this.state;
        currentStep = currentStep + 1;
        this.setState({ currentStep });
        // console.log(this.state);
      }
    };

    const handlePrev = () => {
      let { currentStep } = this.state;
      currentStep = currentStep - 1;
      this.setState({ currentStep });
    };
    const StepperStep = [
      { label: "Personal" },
      { label: "Educational" },
      { label: "Professional" },
      { label: "Document Upload" }
    ];
    const getStepItems = steps => {
      switch (steps) {
        case 0:
          return (
            <Step1
              state={this.state}
              handleOnChange={handleOnChange}
              handleOnChangeDate={handleOnChangeDate}
              handleNext={handleNext}
              handlePrev={handlePrev}
              otherCoursesChange={otherCoursesChange}
            />
          );
        case 1:
          return (
            <div>
              <Step2
                state={this.state}
                handleOnChange={handleOnChange}
                handleOnChangeDate={handleOnChangeDate}
                handleNext={handleNext}
                handlePrev={handlePrev}
                otherCoursesChange={otherCoursesChange}
              />
            </div>
          );
        case 2:
          return (
            <></>
            // <Step3
            //   state={this.state}
            //   handleOnChange={handleOnChange}
            //   handleNext={handleNext}
            //   handlePrev={handlePrev}
            //   professionalExperienceChange={professionalExperienceChange}
            // />
          );
        case 3:
          return <Step4 />;
        case 4:
          return (
            <Finished
              state={this.state}
              handleSubmit={handleSubmit}
              handlePrev={handlePrev}
            />
          );
        default:
          return (
            <Step1
              state={this.state}
              handleOnChange={handleOnChange}
              handleNext={handleNext}
            />
          );
      }
    };

    return (
      <Grid container className={classes.formContainer}>
        <Grid item xs={12} sm={9}>
          <Paper>
            <Box mb={2} p={2} component={Paper}>
              {renderText({ label: "PGDERP Form" })}
            </Box>
            <Stepper activeStep={this.state.currentStep} alternativeLabel>
              {StepperStep.map((item, i) => (
                <Step key={i}>
                  <StepLabel>{item.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          <Box component={Paper}>
            <form className={classes.form} onSubmit={e => e.preventDefault()}>
              {getStepItems(this.state.currentStep)}
            </form>
          </Box>
        </Grid>
      </Grid>
    );
  }
}

FormComponent.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(Styles)(FormComponent);

{
  /* <Box component={Paper}>
<form className={classes.form}>
    <Box mt={1} mb={2}>
    {renderText({label:"form component"})} 
    </Box>                        
    
</form>
</Box> */
}
{
  /* <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                            {renderInputText({label:"First Name", 
                            name: "FirstName", 
                            state: this.state, 
                            handleOnChange: handleOnChange })}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                            {renderInputText({label:"Last Name", 
                            name: "LastName", 
                            state: this.state, 
                            handleOnChange: handleOnChange })}
                            </Grid>
                            <Grid container spacing={2} justifyContent="flex-end">
                                <Box p={2}>
                                {renderButton({label:"next", handleOnClick: handleNext})}
                                </Box>
                            </Grid>

                        </Grid> */
}
