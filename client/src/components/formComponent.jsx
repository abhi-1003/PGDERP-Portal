import {
	Stepper,
	StepLabel,
	Step,
	Box,
	Grid,
	Paper,
	TextField,
	Typography,
	withStyles,
} from "@material-ui/core";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Styles } from "./common/styles";
import Step1 from "./steps/SStep";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
// import Step2b from "./steps/form_table";
import {
	renderButton,
	renderInputText,
	renderText,
} from "./common/displayComponents";
import Finished from "./steps/Finished";
import { useState } from "react";
import dayjs from "dayjs";

class FormComponent extends Component {
	state = {
		data: {
			ID: "",
			course: "",
			campusPreference: "",
			lastName: "",
			firstName: "",
			middleName: "",
			Address: "",
			permanentAddress: "",
			email: "",
			gender: "",
			phyDis: "",
			number: "",
			PHname: "",
			PHemail: "",
			PHnumber: "",
			dob: "",
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
			AliveBacklogPostGrad: "",
		},
		errors: {},
		currentStep: 0,
		age: 0,
		HSCFilled: false,
		DiplomaFilled: false,
		noneFilled: false,
	};
	render() {
		const { classes } = this.props;

		const handleChangePreferences = (event) => {
			const {
				target: { value },
			} = event;
			const { data, errors } = this.state;
			// setPersonName(
			//   // On autofill we get a stringified value.
			//   typeof value === 'string' ? value.split(',') : value,
			// );
			//   var coursePreference;

			console.log(value);
			data["campusPreference"] =
				typeof value === "string" ? value.split(",") : value;
			if (value.length !== 3) {
				errors["campusPreference"] = "Select 3 preferences";
			} else {
				errors["campusPreference"] = "";
			}
			this.setState({ data, errors });
		};

		const today = dayjs();
		const handleOnChangeDate = (name, value) => {
			const { data, errors } = this.state;
			// console.log(today.$y - value.$y);
			this.state.age = today.$y - value.$y;
			data[name.name] = [value.$D, value.$M, value.$y];
			// data[target.name] = target.value;
			// console.log("run")
			// console.log(name.name);
			// console.log(value);
			this.setState({ data, errors });
		};
		const validateEmail = (email) => {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		};
		const handleOnChange = ({ target }) => {
			console.log(target.name, "changed");
			const { data, errors } = this.state;
			target.value.length <= 0
				? (errors[
						target.name
				  ] = `${target.name} cannot be an empty field`)
				: (errors[target.name] = "");

			if (target.name === "ID") {
				console.log(target.value);
				target.value.length !== 8 ||
				target.value.substring(0, 2) !== "ER"
					? (errors[target.name] =
							"ID must be of length 8 starting with ER. e.g. ER221001")
					: (errors[target.name] = "");
			} else if (target.name === "course") {
				console.log(target.value);
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
					? (errors[target.name] =
							"Enter a valid 10 digit phone number")
					: (errors[target.name] = "");
			}

			data[target.name] = target.value;
			this.setState({ data, errors });
		};

		const handleOnClick = ({ target }) => {};

		const handleNext = () => {
			const { data, errors } = this.state;
			let step = this.state.currentStep;
			let goToNext = true;
			if (
				(data.ID.length !== 8 || data.ID.substring(0, 2) !== "ER") &&
				step === 0
			) {
				goToNext = false;
				errors["ID"] =
					"ID must be of length 8 starting with ER. e.g. ER221001";
				console.log("1");
			}
			if (!validateEmail(data.email) && step === 0) {
				goToNext = false;
				errors["email"] = "Enter a valid email address";
				console.log("2");
			}
			if (!validateEmail(data.PHemail) && step === 0) {
				goToNext = false;
				errors["PHemail"] = "Enter a valid email address";
				console.log("3");
			}
			if (data.number.length !== 10 && step === 0) {
				goToNext = false;
				errors["number"] = "Enter a valid phone number";
				console.log("4");
			}
			if (data.PHnumber.length !== 10 && step === 0) {
				goToNext = false;
				errors["PHnumber"] = "Enter a valid phone number";
				console.log("5");
			}
			if (step === 0) {
				data.campusPreference === ""
					? (errors["campusPreference"] =
							"Enter a valid campus preference")
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
				console.log("6");
			}
			if (data.InstituteSSC.length <= 0 && step === 1) {
				errors["InstituteSSC"] = "Enter a valid institute";
				goToNext = false;
			}
			if (
				(data.SSCTo.length !== 4 ||
					data.SSCFrom.length !== 4 ||
					isNaN(data.SSCFrom) ||
					isNaN(data.SSCTo)) &&
				step === 1
			) {
				errors["SSCTo"] = "Enter a valid year";
				errors["SSCFrom"] = "Enter a valid year";
				goToNext = false;
			}
			if (
				(Number(data.SSCmark) > 100 || Number(data.SSCmarks) < 35) &&
				step === 1
			) {
				errors["SSCmarks"] = "Enter a valid percentage";
				goToNext = false;
			}

			if (
				(data.HSCTo.length !== 4 ||
					data.HSCFrom.length !== 4 ||
					isNaN(data.HSCFrom) ||
					isNaN(data.HSCTo)) &&
				step === 1
			) {
				errors["InstituteHSC"] = "Enter a valid institute";
				if (data.HSCFrom.length !== 4 || isNaN(data.HSCFrom)) {
					errors["HSCFrom"] = "Enter a valid year";
				} else if (data.HSCTo.length !== 4 || isNaN(data.HSCTo)) {
					errors["HSCTo"] = "Enter a valid year";
				}
			}
			if (
				(Number(data.HSCmarks) > 100 || Number(data.HSCmarks) < 35) &&
				step === 1
			) {
				errors["HSCmarks"] = "Enter a valid percentage";
				goToNext = false;
			}

			// if (
			// 	(data.DiplomaTo.length !== 4 ||
			// 		data.DiplomaFrom.length !== 4 ||
			// 		isNaN(data.DiplomaFrom) ||
			// 		isNaN(data.DiplomaTo)) &&
			// 	step === 1
			// ) {
			// 	errors["InstituteDiploma"] = "Enter a valid institute";
			// 	if (data.DiplomaFrom.length !== 4 || isNaN(data.DiplomaFrom)) {
			// 		errors["DiplomaFrom"] = "Enter a valid year";
			// 	} else if (
			// 		data.DiplomaTo.length !== 4 ||
			// 		isNaN(data.DiplomaTo)
			// 	) {
			// 		errors["DiplomaTo"] = "Enter a valid year";
			// 	}
			// }
			if (
				(Number(data.Diplomamarks) > 100 ||
					Number(data.Diplomamarks) < 35) &&
				step === 1
			) {
				errors["Diplomamarks "] = "Enter a valid percentage";
				goToNext = false;
			}

			if (step === 1) {
				data.InstituteGrad === ""
					? (errors["InstituteGrad"] = "Enter a valid Institute")
					: (errors["InstituteGrad"] = "");
				data.SpecializationGrad === ""
					? (errors["SpecializationGrad"] =
							"Enter a valid Specialization")
					: (errors["SpecializationGrad"] = "");
				data.GradFrom.length !== 4 || isNaN(data.GradFrom)
					? (errors["GradFrom"] = "Enter a valid year")
					: (errors["GradFrom"] = "");
				data.GradTo.length !== 4 || isNaN(data.GradTo)
					? (errors["GradTo"] = "Enter a valid year")
					: (errors["GradTo"] = "");
				isNaN(data.FinalYearMarksGrad)
					? (errors["FinalYearMarksGrad"] = "Enter a valid marks")
					: (errors["FinalYearMarksGrad"] = "");
				isNaN(data.AggregateMarksGrad)
					? (errors["AggregateMarksGrad"] = "Enter a valid marks")
					: (errors["AggregateMarksGrad"] = "");
			}

			for (const property in this.state.errors) {
				if (this.state.errors[property] !== "") {
					console.log(property);
					goToNext = false;
				} else {
					goToNext = true;
				}
			}

			if (
				(errors["HSCTo"] ||
					errors["HSCTo"] ||
					errors["HSCmarks"] ||
					errors["InstituteHSC"]) === "" &&
				step === 1
			) {
				let HSCFilled = true;
				this.setState({ HSCFilled });
			}
			if (
				(errors["DiplomaFrom"] ||
					errors["DiplomaTo"] ||
					errors["Diplomamarks"] ||
					errors["InstituteDiploma"]) === "" &&
				step === 1
			) {
				let DiplomaFilled = true;
				this.setState({ DiplomaFilled });
			}

			if (
				(!this.state.HSCFilled || !this.state.DiplomaFilled) &&
				step === 1
			) {
				this.setState({ noneFilled: true });
				goToNext = false;
			}
			this.setState({ data, errors });
			console.log(errors);
			if (goToNext) {
				let { currentStep } = this.state;
				currentStep = currentStep + 1;
				this.setState({ currentStep });
				console.log(this.state);
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
		];
		const getStepItems = (steps) => {
			switch (steps) {
				case 0:
					return (
						<Step1
							state={this.state}
							handleOnChange={handleOnChange}
							handleOnChangeDate={handleOnChangeDate}
							handleNext={handleNext}
							handleChangePreferences={handleChangePreferences}
						/>
					);
				case 1:
					return (
						<div>
							<Step2
								state={this.state}
								handleOnChange={handleOnChange}
								handleNext={handleNext}
								handlePrev={handlePrev}
							/>
							{/* <Step2b /> */}
						</div>
					);
				case 2:
					return (
						<Step3
							state={this.state}
							handleOnChange={handleOnChange}
							handleNext={handleNext}
							handlePrev={handlePrev}
						/>
					);
				case 3:
					return <Finished state={this.state.data} />;
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
						<Stepper
							activeStep={this.state.currentStep}
							alternativeLabel
						>
							{StepperStep.map((item, i) => (
								<Step key={i}>
									<StepLabel>{item.label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Paper>

					<Box component={Paper}>
						<form
							className={classes.form}
							onSubmit={(e) => e.preventDefault()}
						>
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
