import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import CallIcon from '@mui/icons-material/Call';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation } from "react-router-dom";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
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
} from "../components/common/displayComponents";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { BACKEND_URL } from "../config";
import axios from "axios";
import Button from "@mui/material/Button";

import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';

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
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFFFFF",
  },
  "&:nth-of-type(even)": {
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
  const [stateVar, setStateVar] = React.useState({
    data: {
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
      age: 0,
    },
    errors: {},
  });

  React.useEffect(() => {
    // console.log(location.state.student_data._id)
    if (location.state) {
      if (location.state.student_data._id) {
        let body = { id: location.state.student_data._id };
        let url = BACKEND_URL + "/student/me";
        axios
          .post(url, body, {
            headers: {
              "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
            },
          })
          .then((res) => {
            setPersonalData(res.data.user);
          });
      }
    }
  }, []);

  React.useEffect(() => {
    let copyErrors = { ...stateVar.errors };
    let copyData = { ...stateVar.data };
    if ("personalInfo" in personalData) {
      // if (
      //   "campusPreference" in personalData.personalInfo &&
      //   personalData.personalInfo.campusPreference.length === 3
      // ) {
      //   copyData = {
      //     ...copyData,
      //     campusPreference1: personalData.personalInfo.campusPreference[0],
      //     campusPreference2: personalData.personalInfo.campusPreference[1],
      //     campusPreference3: personalData.personalInfo.campusPreference[2],
      //   };
      // }
      if (
        "firstName" in personalData.personalInfo &&
        personalData.personalInfo.firstName
      ) {
        copyData = {
          ...copyData,
          firstName: personalData.personalInfo.firstName,
        };
      }
      if (
        "middleName" in personalData.personalInfo &&
        personalData.personalInfo.middleName
      ) {
        copyData = {
          ...copyData,
          middleName: personalData.personalInfo.middleName,
        };
      }
      if (
        "lastName" in personalData.personalInfo &&
        personalData.personalInfo.lastName
      ) {
        copyData = {
          ...copyData,
          lastName: personalData.personalInfo.lastName,
        };
      }

      if (
        "Address" in personalData.personalInfo &&
        personalData.personalInfo.Address
      ) {
        copyData = { ...copyData, Address: personalData.personalInfo.Address };
      }

      if (
        "permanentAddress" in personalData.personalInfo &&
        personalData.personalInfo.permanentAddress
      ) {
        copyData = {
          ...copyData,
          permanentAddress: personalData.personalInfo.permanentAddress,
        };
      }

      if (
        "gender" in personalData.personalInfo &&
        personalData.personalInfo.gender
      ) {
        copyData = { ...copyData, gender: personalData.personalInfo.gender };
      }

      if (
        "phyDis" in personalData.personalInfo &&
        personalData.personalInfo.phyDis
      ) {
        copyData = { ...copyData, phyDis: personalData.personalInfo.phyDis };
      }

      if (
        "PHname" in personalData.personalInfo &&
        personalData.personalInfo.PHname
      ) {
        copyData = { ...copyData, PHname: personalData.personalInfo.PHname };
      }

      if (
        "PHemail" in personalData.personalInfo &&
        personalData.personalInfo.PHemail
      ) {
        copyData = { ...copyData, PHemail: personalData.personalInfo.PHemail };
      }

      if (
        "PHnumber" in personalData.personalInfo &&
        personalData.personalInfo.PHnumber
      ) {
        copyData = {
          ...copyData,
          PHnumber: personalData.personalInfo.PHnumber,
        };
      }

      if ("dob" in personalData.personalInfo && personalData.personalInfo.dob) {
        copyData = { ...copyData, dob: personalData.personalInfo.dob };
      }

      if ("age" in personalData.personalInfo && personalData.personalInfo.age) {
        copyData = { ...copyData, age: personalData.personalInfo.age };
      }

      if("domicileState" in personalData.personalInfo && personalData.personalInfo.domicileState){
        copyData = {...copyData, domicileState: personalData.personalInfo.domicileState}
      }

      if("nationality" in personalData.personalInfo && personalData.personalInfo.nationality){
        copyData = {...copyData, nationality : personalData.personalInfo.nationality}
      }

      if("caste" in personalData.personalInfo && personalData.personalInfo.caste){
        copyData = {...copyData, caste : personalData.personalInfo.caste}
      }
    }
    setStateVar({ data: copyData, errors: copyErrors });
  }, [personalData]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ backgroundColor: "#FFFFE0", minHeight: "100vh" }}>
      <Toolbar />
      <List>
        {location.state.options &&
          Object.keys(location.state.options).map((text, index) => (
            <ListItem key={text}>
              <ListItemButton
                onClick={() =>
                  navigate(location.state.options[text], {
                    state: {
                      student_data: location.state.student_data,
                      options: location.state.options,
                    },
                  })
                }
              >
                <ListItemIcon>
                {index === 0 && (
                  <HomeIcon />
                )}
                {
                  index === 1 && (
                    <AppRegistrationIcon />
                  )
                }
                {
                  index === 2 && (
                    <EditIcon />
                  )
                }
                {
                  index === 3 && (
                    <DownloadIcon />
                  )
                }
                {
                  index === 4 && (
                    <LogoutIcon />
                  )
                }
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleOnChange = ({ target }) => {
    let errors = { ...stateVar.errors };
    let data = { ...stateVar.data };
    data[target.name] = target.value;
    setStateVar({ data: data, errors: errors });
  };

  const today = dayjs();

  const handleOnChangeDate = (name, value) => {
    let { data, errors } = stateVar;
    if (name === "dob") {
      data.age = today.$y - value.$y;
    }
    data[name] = [value.$D, value.$M + 1, value.$y];
    setStateVar({ data: data, errors: errors });
  };

  const handleSave = () => {
    let { data, errors } = stateVar;
    // if (data.campusPreference1 === "") {
    //   errors["campusPreference1"] = "Field cannot be empty";
    // } else {
    //   errors["campusPreference1"] = "";
    // }

    // if (data.campusPreference2 === "") {
    //   errors["campusPreference2"] = "Field cannot be empty";
    // } else {
    //   errors["campusPreference2"] = "";
    // }

    // if (data.campusPreference3 === "") {
    //   errors["campusPreference3"] = "Field cannot be empty";
    // } else {
    //   errors["campusPreference3"] = "";
    // }

    // if (
    //   data.campusPreference3 === data.campusPreference2 ||
    //   data.campusPreference1 === data.campusPreference2 ||
    //   data.campusPreference3 === data.campusPreference1
    // ) {
    //   errors["campusPreference1"] = "All preferences should be different";
    //   errors["campusPreference2"] = "All preferences should be different";
    //   errors["campusPreference3"] = "All preferences should be different";
    // } else if (
    //   data.campusPreference1 != "" &&
    //   data.campusPreference2 != "" &&
    //   data.campusPreference3 != ""
    // ) {
    //   errors["campusPreference1"] = "";
    //   errors["campusPreference2"] = "";
    //   errors["campusPreference3"] = "";
    // }

    if (data.firstName === "") {
      errors["firstName"] = "Field cannot be empty";
    } else {
      errors["firstName"] = "";
    }

    if (data.middleName === "") {
      errors["middleName"] = "Field cannot be empty";
    } else {
      errors["middleName"] = "";
    }

    if (data.lastName === "") {
      errors["lastName"] = "Field cannot be empty";
    } else {
      errors["lastName"] = "";
    }

    if (data.Address === "") {
      errors["Address"] = "Field cannot be empty";
    } else {
      errors["Address"] = "";
    }

    if (data.permanentAddress === "") {
      errors["permanentAddress"] = "Field cannot be empty";
    } else {
      errors["permanentAddress"] = "";
    }

    if (data.gender === "") {
      errors["gender"] = "Field cannot be empty";
    } else {
      errors["gender"] = "";
    }

    if (data.phyDis === "") {
      errors["phyDis"] = "Field cannot be empty";
    } else {
      errors["phyDis"] = "";
    }

    if (data.PHname === "") {
      errors["PHname"] = "Field cannot be empty";
    } else {
      errors["PHname"] = "";
    }

    if (data.PHemail === "") {
      errors["PHemail"] = "Field cannot be empty";
    } else if (!validateEmail(data.PHemail)) {
      errors["PHemail"] = "Please enter correct format of email";
    } else {
      errors["PHemail"] = "";
    }

    if (data.PHnumber === "" && !new RegExp("^([0|+[0-9]{1,5})?([7-9][0-9]{9})$").test(data.PHnumber)) {
      errors["PHnumber"] = "Enter a valid 10 digit phone number";
    } else {
      errors["PHnumber"] = "";
    }

    if (data.dob === [] || data.dob.length !== 3) {
      errors["dob"] = "Please enter Date of Birth";
    } else {
      errors["dob"] = "";
    }

    if(data.domicileState === ""){
        errors["domicileState"] = "Field cannot be empty"
    }
    else{
        errors["domicileState"] = "";
    }

    if(data.caste === ""){
        errors["caste"] = "Field cannot be empty"
    }
    else{
        errors["caste"] = "";
    }

    if(data.nationality === ""){
        errors["nationality"] = "Field cannot be empty"
    }
    else{
        errors["nationality"] = "";
    }

    setStateVar({ data: data, errors: errors });
    data = {
      ...data,
      // campusPreference: [
      //   data.campusPreference1,
      //   data.campusPreference2,
      //   data.campusPreference3,
      // ],
    };
    // delete data["campusPreference1"];
    // delete data["campusPreference2"];
    // delete data["campusPreference3"];

    let validate = true;

    Object.keys(errors).map((error) => {
      if (errors[error] !== "") {
        validate = false;
      }
    });

    if (validate == true) {
      const personalInfo = data;
      const url = BACKEND_URL + "/student/editStudentInfo";
      const body = {
        personalInfo: personalInfo,
        academicsInfo: personalData.academicsInfo,
        professionalExperience: personalData.professionalExperience,
        feesDetails: personalData.feesDetails,
        id: personalData._id,
        message: "Personal Info Completed"
      };
      axios
        .post(url, body, {
          headers: {
            "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
          },
        })
        .then((res) => {
          alert(res.data.message);
          navigate("/student/academicsInfo", {
            state: {
              student_data: location.state.student_data,
              options: location.state.options,
            },
          })
        });
    } else {
      alert("Please fill all data first");
    }
  };

  return (
    <Box bgcolor="#E5EDF1" sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#00ABE4",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          bg
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Paper component={Box} p={2}>
          <Grid container spacing={2} style={{ justifyContent: "center" }}>
            <Box mt={1} mb={2}>
              {renderText({ label: "Personal Information Details" })}
            </Box>
          </Grid>

          <TableContainer component={Paper}>
            <Table aria-label="Candidate Details">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Field Name</StyledTableCell>
                  <StyledTableCell>Details</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* REGISTRATION - ID */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Registration ID:" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    {renderInputTextDisabled({
                      label: location.state.student_data.registrationID,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* COURSE */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Course Name:" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    {renderInputTextDisabled({
                      label: location.state.student_data.course,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* <StyledTableRow>
                  <StyledTableCell sx={{ padding: "16px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({
                        label: "Campus Preferences",
                      })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Grid container spacing={2} style={{ marginTop: "1px" }}>
                      <Grid item xs={12} sm={3}>
                        {renderInputSelect({
                          label: "Preference-1",
                          name: "campusPreference1",
                          stateVar,
                          handleOnChange: handleOnChange,
                          arr: [
                            { value: "COEP Tech", label: "COEP Tech" },
                            {
                              value: "VPKBIT Baramati",
                              label: "VPKBIT Baramati",
                            },
                            { value: "VPKBIT Nashik", label: "VPKBIT Nashik" },
                          ],
                        })}
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        {renderInputSelect({
                          label: "Preference-2",
                          name: "campusPreference2",
                          stateVar,
                          handleOnChange: handleOnChange,
                          arr: [
                            { value: "COEP Tech", label: "COEP Tech" },
                            {
                              value: "VPKBIT Baramati",
                              label: "VPKBIT Baramati",
                            },
                            { value: "VPKBIT Nashik", label: "VPKBIT Nashik" },
                          ],
                        })}
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        {renderInputSelect({
                          label: "Preference-3",
                          name: "campusPreference3",
                          stateVar,
                          handleOnChange: handleOnChange,
                          arr: [
                            { value: "COEP Tech", label: "COEP Tech" },
                            {
                              value: "VPKBIT Baramati",
                              label: "VPKBIT Baramati",
                            },
                            { value: "VPKBIT Nashik", label: "VPKBIT Nashik" },
                          ],
                        })}
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow> */}

                <StyledTableRow>
                  <StyledTableCell>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Name:" })}
                    </Box>
                  </StyledTableCell>
                  <TableCell>
                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                      <Grid item xs={12} sm={3}>
                        {renderMultiInputText({
                          label: "First Name",
                          name: "firstName",
                          stateVar,
                          handleOnChange: handleOnChange,
                          personalData: personalData,
                        })}
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        {renderMultiInputText({
                          label: "Middle Name",
                          name: "middleName",
                          stateVar,
                          handleOnChange: handleOnChange,
                          personalData: personalData,
                        })}
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        {renderMultiInputText({
                          label: "Surname",
                          name: "lastName",
                          stateVar,
                          handleOnChange: handleOnChange,
                          personalData: personalData,
                        })}
                      </Grid>
                    </Grid>{" "}
                  </TableCell>
                </StyledTableRow>

                {/* POSTAL ADDRESS */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Postal Address" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderMultiInputText({
                      label: "",
                      name: "Address",
                      stateVar,
                      handleOnChange: handleOnChange,
                      personalData: personalData,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* PERMANENT ADD */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Permanent Address" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderMultiInputText({
                      label: "",
                      name: "permanentAddress",
                      stateVar,
                      handleOnChange: handleOnChange,
                      personalData: personalData,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* EMAIL */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "E-mail ID" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "8px" }}>
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
                      personalData
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
                      personalData
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Phone Number" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    {renderInputTextDisabled({
                      label: location.state.student_data.mobile,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* PARENTS / HUSBANDS NAME */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Parents/Husband's Name:" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderMultiInputText({
                      label: "",
                      name: "PHname",
                      stateVar,
                      handleOnChange: handleOnChange,
                      personalData: personalData,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* PARENTS HUSBANDS EMAIL */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Parent's/Husband's Email-ID:" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderMultiInputText({
                      label: "",
                      name: "PHemail",
                      stateVar,
                      handleOnChange: handleOnChange,
                      personalData: personalData,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* PARENT HUSBANDS NUMBER */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({
                        label: "Parent's/Husband's Phone Number:",
                      })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderMultiInputText({
                      label: "",
                      name: "PHnumber",
                      stateVar,
                      handleOnChange: handleOnChange,
                      personalData: personalData,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* DOB */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Date of Birth: (MM/DD/YYYY)" })}
                    </Box>
                  </StyledTableCell>

                  {personalData &&
                    "personalInfo" in personalData &&
                    "dob" in personalData.personalInfo &&
                    personalData.personalInfo.dob.length === 3 && (personalData.applicationFilled==false || (personalData.applicationFilled==true && personalData.modifications.includes("dob") && personalData.personalInfoEditable==true)) && (
                      <StyledTableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="dob"
                                defaultValue={dayjs(
                                  personalData.personalInfo.dob[2] +
                                    "-" +
                                    personalData.personalInfo.dob[1] +
                                    "-" +
                                    personalData.personalInfo.dob[0]
                                )}
                                onChange={(value) =>
                                  handleOnChangeDate("dob", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["dob"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

{personalData &&
                    "personalInfo" in personalData &&
                    "dob" in personalData.personalInfo &&
                    personalData.personalInfo.dob.length === 3 && personalData.applicationFilled==true && (!personalData.modifications.includes("dob")) && (
                      <StyledTableCell>
                        {renderInputTextDisabled({
                      label: personalData.personalInfo.dob[0] +
                      "-" +
                      personalData.personalInfo.dob[1] +
                      "-" +
                      personalData.personalInfo.dob[2],
                    })}
                      </StyledTableCell>
                    )}
                

                {personalData &&
                  "personalInfo" in personalData &&
                  "dob" in personalData.personalInfo &&
                  personalData.personalInfo.dob.length === 0 && (
                    <StyledTableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          {" "}
                          <DemoItem label="">
                            <DatePicker
                              disableFuture
                              // views={['year', 'month', 'day']}
                              name="dob"
                              onChange={(value) =>
                                handleOnChangeDate("dob", value)
                              }
                            ></DatePicker>
                            <Typography sx={{ width: "100%", color: "red" }}>
                              {stateVar["errors"]["dob"]}
                            </Typography>
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </StyledTableCell>
                  )}

                </StyledTableRow>

                {/* AGE - SET BY DEFAULT */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Age : " })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    {renderInputTextDisabled({
                      label: stateVar["data"]["age"],
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* DOMICILE STATE */}
                <StyledTableRow>
                    <StyledTableCell sx={{ padding: "8px" }}>
                        <Box mb={0.5} mt={0.5} mr={0}>
                                {renderText1({
										label: "Domicile State of Candidate:",
									})}
                        </Box>
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "8px" }}>
                        {renderInputText({
                        label: "",
                        name: "domicileState",
                        stateVar,
                        handleOnChange: handleOnChange,
                        personalData: personalData
                        })}
                    </StyledTableCell>
                </StyledTableRow>

                {/* CASTE */}
                <StyledTableRow>
                    <StyledTableCell sx={{ padding: "8px" }}>
                        <Box mb={0.5} mt={0.5} mr={0}>
                                {renderText1({
										label: "Caste : ",
									})}
                        </Box>
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "8px" }}>
                        {renderInputText({
                        label: "",
                        name: "caste",
                        stateVar,
                        handleOnChange: handleOnChange,
                        personalData: personalData
                        })}
                    </StyledTableCell>
                </StyledTableRow>

                {/* Nationality */}
                <StyledTableRow>
                    <StyledTableCell sx={{ padding: "8px" }}>
                        <Box mb={0.5} mt={0.5} mr={0}>
                                {renderText1({
										label: "Nationality",
									})}
                        </Box>
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: "8px" }}>
                        {renderInputText({
                        label: "",
                        name: "nationality",
                        stateVar,
                        handleOnChange: handleOnChange,
                        personalData: personalData
                        })}
                    </StyledTableCell>
                </StyledTableRow>

              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Button
          variant="contained"
          onClick={() => handleSave()}
          color="success"
          style={{ margin: "0 auto", display: "flex", marginTop: "3%" }}
        >
          SAVE & GO TO NEXT
        </Button>
        <Box sx={{height:"70px"}} />
      </Box>
      <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0, backgroundColor:"#00ABE4", height:"7%" }}>
        <Toolbar>
        <Box sx={{ flexGrow: 0.4 }} />
        <IconButton color="inherit">
            <ArrowForwardIosIcon/>
          </IconButton>
          <Typography color="inherit">
            <a href="http://www.coep.org.in/" target="_blank" rel="noopener noreferrer">
          http://www.coep.org.in/
          </a>
          </Typography>
          <Box sx={{ flexGrow: 0.3 }} />
          <IconButton color="inherit">
            <MailIcon />
          </IconButton>
          <Typography color="inherit">
          pgdadmission@coeptech.ac.in
          </Typography>
        </Toolbar>
        
      </AppBar>
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
