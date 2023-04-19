import { Stepper, StepLabel, Step, Box, Grid, Paper, TextField, Typography, withStyles } from "@material-ui/core";
import React,{ Component } from "react";
import  PropTypes  from "prop-types";
import { Styles } from './common/styles';
import Step1 from './steps/Step1T'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'
import Step4 from './steps/Step4'
import Step5 from './steps/Step5'
import { renderButton, renderInputText, renderText } from "./common/displayComponents";
class FormComponent extends Component{
    state = {
        data :{
            FirstName: "",
            LastName: ""  //53min
        },
        errors: {},
        currentStep:0,
    }
    render(){
        const { classes } = this.props;

        const handleOnChange = ({target}) =>{
            const{data,errors} = this.state;
            target.value.length <= 3 ? (errors[target.name] = `${target.name} have atleast 3 letter`)
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
            {label:"Grad/Post Grad"},
            {label:"Other Courses"},
            {label:"Professional"},
        ];
        const getStepItems = (steps) => {
            switch(steps){
                case 0: 
                return <Step1  
                state={this.state}
                handleOnChange={handleOnChange}
                handleNext={handleNext}                          
                />;
                case 1: 
                return <Step2 state={this.state}
                handleOnChange={handleOnChange}
                handleNext={handleNext}
                handlePrev={handlePrev}/>;
                case 2: 
                return <Step3 state={this.state}
                handleOnChange={handleOnChange}
                handleNext={handleNext}
                handlePrev={handlePrev}/>;
                case 3: 
                return <Step4 state={this.state}
                handleOnChange={handleOnChange}
                handleNext={handleNext}
                handlePrev={handlePrev}/>;
                case 4: 
                return <Step5 state={this.state}
                handleOnChange={handleOnChange}
                handleNext={handleNext}
                handlePrev={handlePrev}/>;
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
                    <form className={classes.form}>                                          
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