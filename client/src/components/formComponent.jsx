import { Stepper, StepLabel, Step, Box, Grid, Paper, TextField, Typography, withStyles } from "@material-ui/core";
import React,{ Component } from "react";
import  PropTypes  from "prop-types";
import { Styles } from './common/styles';
import Step1 from './steps/SStep';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
// import Step2b from "./steps/form_table";
import { renderButton, renderInputText, renderText } from "./common/displayComponents";
import Finished from "./steps/Finished";
import { useState } from "react";
import dayjs from 'dayjs';

class FormComponent extends Component{
    state = {
        data :{
            ID: "",
            course: "",
            'coursePreference':"",
            lastName:"",
            firstName:"",
            middleName:"",
            Address:"",
            permanentAddress:"",
            email:"",
            gender:"",
            phyDis:"",
            number:"",
            PHname:"",
            PHemail:"",
            PHnumber:"",
            'dob':"",
            domicileState:"",
            nationality:"",
            InstituteSSC:"",
            InstituteHSC:"",
            SSCFrom:"",
            HSCFrom:"",
            SSCTo:"",
            HSCTo:"",
            SSCmarks:"",
            HSCmarks:"",
            Diplomamarks:"",
            InstituteGrad:"",
            SpecializationGrad:"",
            GradFrom:"",
            GradTo:"",
            FinalYearMarksGrad:"",
            AggregateMarksGrad:"",
            DeadBacklogsGrad:"",
            AliveBacklogGrad:"",
            InstitutePostGrad:"",
            SpecializationPostGrad:"",
            PostGradFrom:"",
            PostGradTo:"",
            FinalYearMarksPostGrad:"",
            AggregateMarksPostGrad:"",
            DeadBacklogsPostGrad:"",
            AliveBacklogPostGrad:""
        },
        errors: {},
        currentStep:0,
        age:0,

    }
    render(){
        const { classes } = this.props;


        const handleChangePreferences = (event) => {
            const {
              target: { value },
            } = event;
            const{data,errors} = this.state;
            // setPersonName(
            //   // On autofill we get a stringified value.
            //   typeof value === 'string' ? value.split(',') : value,
            // );
          //   var coursePreference;
          
          console.log(value)
            data['coursePreference']=typeof value === 'string' ? value.split(',') : value;;
          };
        
        const today = dayjs();
        const handleOnChangeDate=(name,value)=>{
            const{data,errors} = this.state;
            // console.log(today.$y - value.$y);
            this.state.age = today.$y - value.$y;
            data[name.name] = [value.$D, value.$M, value.$y];
            // data[target.name] = target.value;
            // console.log("run")
            // console.log(name.name);
            // console.log(value);
            this.setState({data,errors});


        }
        const handleOnChange = ({target}) =>{
            console.log("handleOnChange");
            const{data,errors} = this.state;
            target.value.length <= 0 ? (errors[target.name] = `${target.name} cannot be an empty field`)
            : (errors[target.name] = "");
            data[target.name] = target.value;
            this.setState({data,errors});
        };
        const handleOnClick = ({target}) =>{
            
        };
        const handleNext = () => {
            let {currentStep} = this.state;
            currentStep = currentStep + 1;
            this.setState({ currentStep });
        };
        const handlePrev = () => {
            let {currentStep} = this.state;
            currentStep = currentStep - 1;
            this.setState({ currentStep });
        };
        const StepperStep = [
            {label:"Personal"},
            {label:"Educational"},
            {label:"Professional"},
        ];
        const getStepItems = (steps) => {
            switch(steps){
                case 0: 
                return <Step1 
                state={this.state}
                handleOnChange={handleOnChange}
                handleOnChangeDate={handleOnChangeDate}
                handleNext={handleNext}
                handleChangePreferences={handleChangePreferences}  
                />;
                case 1: 
                return <div><Step2 state={this.state}
                handleOnChange={handleOnChange}
                handleNext={handleNext}
                handlePrev={handlePrev}/>
                {/* <Step2b /> */}
                </div> 
                ;
                case 2: 
                return <Step3 state={this.state}
                handleOnChange={handleOnChange}
                handleNext={handleNext}
                handlePrev={handlePrev}/>;
                case 3:
                return <Finished state={this.state.data}/>;
                default: 
                return <Step1  
                state={this.state}
                handleOnChange={handleOnChange}
                handleNext={handleNext}                          
                />;
            }
        };

        return(
            <Grid container className={classes.formContainer}>
                <Grid item xs={12} sm={9} >
                    <Paper>
                    <Box mb={2} p={2} component={Paper}>
                        {renderText({label:"PGDERP Form"})}
                    </Box>
                    <Stepper activeStep={this.state.currentStep} alternativeLabel>
                    {StepperStep.map((item,i) => (
                        <Step key={i}>
                        <StepLabel>{item.label}</StepLabel>
                        </Step>
                    ))}
                    </Stepper>
                    </Paper>
     
                    <Box component={Paper}>
                    <form className={classes.form} onSubmit={(e)=>e.preventDefault()}>                                          
                        {getStepItems(this.state.currentStep)}
                    </form>
                    </Box>
                </Grid>
            </Grid>
        );
    }
}

FormComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(Styles)(FormComponent);
{/* <Box component={Paper}>
<form className={classes.form}>
    <Box mt={1} mb={2}>
    {renderText({label:"form component"})} 
    </Box>                        
    
</form>
</Box> */}
{/* <Grid container spacing={2}>
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

                        </Grid> */}