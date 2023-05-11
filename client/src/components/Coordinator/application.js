import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Application1 from './application_1';
import Application2 from './application_2';
import Application3 from './application_3';
import Application4 from './application_4';

const data = {
  ID: "123",
  course: "Comp",
  'coursePreference': ['Pune', 'Baramati', 'Nashik'],
  lastName: "XYZ",
  firstName: "ABC",
  middleName: "PQR",
  Address: "Pune",
  permanentAddress: "",
  email: "",
  gender: "",
  phyDis: "",
  number: "",
  PHname: "",
  PHemail: "",
  PHnumber: "",
  'dob': '17-Dec-1998',
  domicileState: "",
  nationality: "",
  InstituteSSC: "",
  InstituteHSC: "",
  SSCFrom: "",
  HSCFrom: "",
  SSCTo: "",
  HSCTo: "",
  SSCmarks: "",
  HSCmarks: "",
  Diplomamarks: "",
  InstituteGrad: "",
  SpecializationGrad: "",
  GradFrom: "",
  GradTo: "",
  FinalYearMarksGrad: "",
  AggregateMarksGrad: "",
  DeadBacklogsGrad: "",
  AliveBacklogGrad: "",
  InstitutePostGrad: "",
  SpecializationPostGrad: "",
  PostGradFrom: "",
  PostGradTo: "",
  FinalYearMarksPostGrad: "",
  AggregateMarksPostGrad: "",
  DeadBacklogsPostGrad: "",
  AliveBacklogPostGrad: ""
}




const useStyles = makeStyles((theme) => ({
  control_buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: '0 30px 30px 30px'
  }
}));

  function Application() {
    let { id } = useParams();
    const getStepContent = (step) => {
      switch (step) {
        case 0:
          return <Application1 data={id} />;
        case 1:
          return <Application2 data={id} />;
        case 2:
          return <Application3 data={id} />;
        case 3:
          return <Application4 data={id} />;
        default:
      }
    };
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  return (
    <div style={{ paddingBottom: '10px' }}>
      {getStepContent(activeStep)}
      <div className={classes.control_buttons}>
        <div>
          <Button variant="contained"
            color="primary" disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
        </div>
        <div>
          {activeStep !== 3 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={activeStep === 4 - 1}
            >
              Next
            </Button>
          ) : (
            <div>              
              <Button
                variant="contained"
                style={{background:'red', margin:'0 15px', color:'white'}}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                style={{background:'green', margin:'0 15px', color:'white'}}
              >
                Accept
              </Button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default Application