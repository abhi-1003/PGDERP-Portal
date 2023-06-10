import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
	Grid,
	Paper,
	Table,
	TableBody,
	TableHead,
	TableRow,
	TableContainer,
} from "@material-ui/core";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
	renderText,
	renderButton,
	renderInputText,
	renderText1,
	renderMultiInputText,
	renderInputSelect,
	renderDate,
	RenderDate,
	MultipleSelect,
	renderInputTextDisabled,
} from "../components/common/displayComponents"
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import Button from '@mui/material/Button';
import e from 'cors';

const drawerWidth = 280;  

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#01257D",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#FFFFFF",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#FFFFFF",
      },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }));

function PersonalInfo() {

  
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = location.state;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [personalData, setPersonalData] = React.useState([]);
  const [stateVar, setStateVar] = React.useState({"data" : {
            campusPreference1: "",
            campusPreference2: "",
            campusPreference3: "",
            lastName: "",
            firstName: "",
            middleName: "",
            Address: "",
            permanentAddress: "",
            gender: "",
            phyDis: "",
            PHname: "",
            PHemail: "",
            PHnumber: "",
            dob: "",
            domicileState: "",
            nationality: "",
            caste: "",
            age: 0
  }, "errors" : {}});

  React.useEffect(() => {
    console.log(location.state.student_data._id)
    if(location.state){
        if(location.state.student_data._id){
            let body = {"id" : location.state.student_data._id}
            let url = BACKEND_URL + "/student/me";
            axios.post(url, body, {
                headers: {
                  "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
                }})
            .then((res) => {
                setPersonalData(res.data.user)
            })
        }
        
    }

    while(!personalData){
        console.log(personalData)
    }

    
  }, []);

  React.useEffect(() => {
    let copyErrors = {...stateVar.errors}
    let copyData = {...stateVar.data}
    if("personalInfo" in personalData){
        if("campusPreference" in personalData.personalInfo && personalData.personalInfo.campusPreference.length === 3){
            
            copyData = { ...copyData, campusPreference1 :  personalData.personalInfo.campusPreference[0], 
                campusPreference2 :  personalData.personalInfo.campusPreference[1],
                campusPreference3 :  personalData.personalInfo.campusPreference[2]
            };
            
        }
        if("firstName" in personalData.personalInfo){
            copyData = {...copyData, firstName: personalData.personalInfo.firstName}
            
        }
        if("middleName" in personalData.personalInfo){
            copyData = {...copyData, middleName: personalData.personalInfo.middleName}
            
        }
        if("lastName" in personalData.personalInfo){
            copyData = {...copyData, lastName: personalData.personalInfo.lastName}
        }

        if("Address" in personalData.personalInfo){
            copyData = {...copyData, Address : personalData.personalInfo.Address}
        }

        if("permanentAddress" in personalData.personalInfo){
            copyData = {...copyData, permanentAddress : personalData.personalInfo.permanentAddress}
        }

        if("gender" in personalData.personalInfo){
            copyData = {...copyData, gender : personalData.personalInfo.gender}
        }

        if("phyDis" in personalData.personalInfo){
            copyData = {...copyData, phyDis : personalData.personalInfo.phyDis}
        }

        if("PHname" in personalData.personalInfo){
            copyData = {...copyData, PHname : personalData.personalInfo.PHname}
        }

    }
    setStateVar({data: copyData, errors: copyErrors})
  }, [personalData])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{backgroundColor:"#FFFFE0", minHeight:"100vh"}}>
      <Toolbar/>
      <List>
        {location.state.options && Object.keys(location.state.options).map((text, index) => (
          <ListItem key={text}>
            <ListItemButton onClick={() => navigate(location.state.options[text], {
                state: {
                    student_data : location.state.student_data,
                    options: location.state.options
                  }
            })}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

  const handleOnChange = ({ target }) => {
    let errors = {...stateVar.errors}
    let data = {...stateVar.data}
    data[target.name] = target.value;
    setStateVar({data: data, errors: errors})
};

    const handleSave = () => {
        let {data, errors} = stateVar;
        if(data.campusPreference1 === ""){
            errors["campusPreference1"] = "Field cannot be empty"
        }
        else{
            errors["campusPreference1"] = ""
        }

        if(data.campusPreference2 === ""){
            errors["campusPreference2"] = "Field cannot be empty"
        }
        else{
            errors["campusPreference2"] = ""
        }

        if(data.campusPreference3 === ""){
            errors["campusPreference3"] = "Field cannot be empty"
        }else{
            errors["campusPreference3"] = ""
        }

        if(data.campusPreference3 === data.campusPreference2 || 
            data.campusPreference1 === data.campusPreference2 ||
            data.campusPreference3 === data.campusPreference1){
                errors["campusPreference1"] = "All preferences should be different"
                errors["campusPreference2"] = "All preferences should be different"
                errors["campusPreference3"] = "All preferences should be different"
            }
        else if(data.campusPreference1!="" && data.campusPreference2!="" && data.campusPreference3!=""){
            errors["campusPreference1"] = ""
            errors["campusPreference2"] = ""
            errors["campusPreference3"] = ""
        }

        if(data.firstName === ""){
            errors["firstName"] = "Field cannot be empty"
        }else{
            errors["firstName"] = ""
        }

        if(data.middleName === ""){
            errors["middleName"] = "Field cannot be empty"
        }else{
            errors["middleName"] = ""
        }

        if(data.lastName === ""){
            errors["lastName"] = "Field cannot be empty"
        }else{
            errors["lastName"] = ""
        }

        if(data.Address === ""){
            errors["Address"] = "Field cannot be empty"
        }else{
            errors["Address"] = ""
        }

        if(data.permanentAddress === ""){
            errors["permanentAddress"] = "Field cannot be empty"
        }else{
            errors["permanentAddress"] = ""
        }

        if(data.gender === ""){
            errors["gender"] = "Field cannot be empty"
        }else{
            errors["gender"] = ""
        }

        if(data.phyDis=== ""){
            errors["phyDis"] = "Field cannot be empty"
        }else{
            errors["phyDis"] = ""
        }
        console.log(data, errors)
        setStateVar({data: data, errors: errors})
        data = {...data, campusPreference : [data.campusPreference1, data.campusPreference2, data.campusPreference3]}
        delete data['campusPreference1']
        delete data['campusPreference2']
        delete data['campusPreference3']
        const personalInfo = data;
        const url = BACKEND_URL + "/student/editStudentInfo"
        const body = {
            personalInfo : personalInfo,
            academicsInfo : location.state.student_data.academicsInfo,
            professionalExperience : location.state.student_data.professionalExperience,
            id : location.state.student_data._id
        }
        console.log(body)
        axios
            .post(url, body)
            .then((res) => {
                alert(res.data);
            })

    }

  return (
    <Box bgcolor = "#E5EDF1" sx={{ display: 'flex', minHeight:"100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:"#00ABE4"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            COEP PG - Diploma Admission Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
        bg
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        
        sx={{flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        
        <Paper component={Box} p={2}>

        <Grid container spacing={2} style={{ justifyContent: "center" }}>
				<Box mt={1} mb={2}>
					{renderText({ label: "Personal Information Details" })}
				</Box>
		</Grid>

        <TableContainer component={Paper}>
            <Table aria-label = "Candidate Details">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            Field Name</StyledTableCell>
                        <StyledTableCell>Details</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {/* REGISTRATION - ID */}
                    <StyledTableRow>
                        <StyledTableCell sx = {{padding: "8px"}}>
                            <Box mb={0.5} mt={0.5} mr={0}>
                                {renderText1({ label: "Registration ID:" })}
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell sx = {{padding: "8px"}}>
                            {renderInputTextDisabled({
                                label: location.state.student_data.registrationID,
                            })}
                        </StyledTableCell>
                    </StyledTableRow>

                    {/* COURSE */}
                    <StyledTableRow>
                        <StyledTableCell sx = {{padding: "8px"}}>
                            <Box mb={0.5} mt={0.5} mr={0}>
                                {renderText1({ label: "Course Name:" })}
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell sx = {{padding: "8px"}}>
                            {renderInputTextDisabled({
                                label: location.state.student_data.course,
                            })}
                        </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                        <StyledTableCell sx = {{padding: "16px"}}>
                            <Box mb={0.5} mt={0.5} mr={0}>
                            {renderText1({
										label: "Campus Preferences",
							})}
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                        <Grid container spacing={2} style={{ marginTop: "1px"}}>
								<Grid item xs={12} sm={3}>
									{renderInputSelect({label:"Preference-1", 
											name: "campusPreference1",
                                            stateVar,
                                            handleOnChange: handleOnChange,
										arr: [
											{value:"COEP Tech",label:"COEP Tech"},
											{value:"VPKBIT Baramati",label:"VPKBIT Baramati"},
											{value:"VPKBIT Nashik",label:"VPKBIT Nashik"},
										] })}
								</Grid>
								<Grid item xs={12} sm={3}>
											{renderInputSelect({label:"Preference-2", 
											name: "campusPreference2", 
                                            stateVar,
                                            handleOnChange: handleOnChange,
											arr: [
											{value:"COEP Tech",label:"COEP Tech"},
											{value:"VPKBIT Baramati",label:"VPKBIT Baramati"},
											{value:"VPKBIT Nashik",label:"VPKBIT Nashik"},
										] })}
								</Grid>
								<Grid item xs={12} sm={3}>
										{renderInputSelect({label:"Preference-3", 
										name: "campusPreference3", 
                                        stateVar,
                                        handleOnChange: handleOnChange,
										arr: [
										{value:"COEP Tech",label:"COEP Tech"},
										{value:"VPKBIT Baramati",label:"VPKBIT Baramati"},
										{value:"VPKBIT Nashik",label:"VPKBIT Nashik"},
									] })}
								</Grid> 
							</Grid>
                            </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                        <StyledTableCell>
								<Box mb={0.5} mt={0.5} mr={0}>
									{renderText1({ label: "Name:" })}
								</Box>
						</StyledTableCell>
                        <TableCell>
                            <Grid
                                container
                                spacing={2}
                                style={{ marginBottom: "1px" }}
                            >
                                <Grid item xs={12} sm={3}>
                                    {renderMultiInputText({
                                        label: "First Name",
                                        name: "firstName",
                                        stateVar,
                                        handleOnChange: handleOnChange
                                    })}
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    {renderMultiInputText({
                                        label: "Middle Name",
                                        name: "middleName",
                                        stateVar,
                                        handleOnChange: handleOnChange
                                    })}
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    {renderMultiInputText({
                                        label: "Surname",
                                        name: "lastName",
                                        stateVar,
                                        handleOnChange: handleOnChange
                                    })}
                                </Grid>
                            </Grid>{" "}
                        </TableCell>
                    </StyledTableRow>

                    {/* POSTAL ADDRESS */}
                    <StyledTableRow>
                        <StyledTableCell sx = {{padding: "8px"}}>
                                <Box mb={0.5} mt={0.5} mr={0}>
									{renderText1({ label: "Postal Address" })}
								</Box>
                        </StyledTableCell>
                        <StyledTableCell>
                                {renderMultiInputText({
									label: "",
									name: "Address",
									stateVar,
									handleOnChange: handleOnChange
								})}
                        </StyledTableCell>
                    </StyledTableRow>

                    {/* PERMANENT ADD */}
                    <StyledTableRow>
                        <StyledTableCell sx = {{padding: "8px"}}>
                                <Box mb={0.5} mt={0.5} mr={0}>
									{renderText1({ label: "Permanent Address" })}
								</Box>
                        </StyledTableCell>
                        <StyledTableCell>
                                {renderMultiInputText({
									label: "",
									name: "permanentAddress",
									stateVar,
									handleOnChange: handleOnChange
								})}
                        </StyledTableCell>
                    </StyledTableRow>
                    
                    {/* EMAIL */}
                    <StyledTableRow>
                        <StyledTableCell sx = {{padding: "8px"}}>
                            <Box mb={0.5} mt={0.5} mr={0}>
                                {renderText1({ label: "E-mail ID" })}
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell sx = {{padding: "8px"}}>
                            {renderInputTextDisabled({
                                label: location.state.student_data.email,
                            })}
                        </StyledTableCell>
                    </StyledTableRow>

                    {/* GENDER */}
                    <StyledTableRow>
                        <StyledTableCell>
                            <Box mb={0.5} mt={0.5} mr={0}>
                                {renderText1({ label: "Gender" })}
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                            {renderInputSelect({
									label: "",
									name: "gender",
									stateVar,
									handleOnChange: handleOnChange,
									arr: [
										{ value: "male", label: "Male" },
										{ value: "female", label: "Female" },
										{ value: "Other", label: "Other" },
									],
								})}
                        </StyledTableCell>
                    </StyledTableRow>

                    {/* PHY DISABILITY */}
                    <StyledTableRow>
                        <StyledTableCell>
                            <Box mb={0.5} mt={0.5} mr={0}>
                            {renderText1({
										label: "Physical Disabilities",
									})}
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                        {renderInputSelect({
									label: "",
									name: "phyDis",
									stateVar,
									handleOnChange: handleOnChange,
									arr: [
										{ value: "Yes", label: "Yes" },
										{ value: "No", label: "No" },
									],
								})}
                        </StyledTableCell>
                    </StyledTableRow>
                    
                    <StyledTableRow>
                        <StyledTableCell sx = {{padding: "8px"}}>
                            <Box mb={0.5} mt={0.5} mr={0}>
                                {renderText1({ label: "Phone Number" })}
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell sx = {{padding: "8px"}}>
                            {renderInputTextDisabled({
                                label: location.state.student_data.mobile,
                            })}
                        </StyledTableCell>
                    </StyledTableRow>


                </TableBody>
            </Table>
        </TableContainer>

        </Paper>
        <Button variant="contained" onClick = {() => handleSave()} color="success" style={{margin: '0 auto', display: "flex", marginTop:"3%"}}>
        SAVE
        </Button>
        
      </Box>
    </Box>
  );
}

PersonalInfo.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default PersonalInfo;
