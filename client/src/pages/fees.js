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

import CallIcon from '@mui/icons-material/Call';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

function FeesDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { window } = location.state;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [personalData, setPersonalData] = React.useState([]);
  const [stateVar, setStateVar] = React.useState({
    data: {
        bank : "",
        refNo : "",
        amt : "1200",
        date: "",
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
    if("feesDetails" in personalData){
        if("bank" in personalData.feesDetails && personalData.feesDetails.bank){
            copyData = {
                ...copyData,
                bank: personalData.feesDetails.bank,
            }
        }
        if("refNo" in personalData.feesDetails && personalData.feesDetails.refNo){
            copyData = {
                ...copyData,
                refNo: personalData.feesDetails.refNo,
            }
        }
        if("amt" in personalData.feesDetails && personalData.feesDetails.amt){
            copyData = {
                ...copyData,
                amt: personalData.feesDetails.amt,
            }
        }
        if("date" in personalData.feesDetails && personalData.feesDetails.date){
            copyData = {
                ...copyData,
                date: personalData.feesDetails.date
            }
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

  const handleOnChange = ({ target }) => {
    let errors = { ...stateVar.errors };
    let data = { ...stateVar.data };
    data[target.name] = target.value;
    setStateVar({ data: data, errors: errors });
  };

  const today = dayjs();

  const handleOnChangeDate = (name, value) => {
    let { data, errors } = stateVar;
    data[name] = [value.$D, value.$M + 1, value.$y];
    setStateVar({ data: data, errors: errors });
  };

  const handleSave = () => {
    let { data, errors } = stateVar;

    if (data.bank === "") {
      errors["bank"] = "Field cannot be empty";
    } else {
      errors["bank"] = "";
    }

    if (data.refNo === "") {
      errors["refNo"] = "Field cannot be empty";
    } else {
      errors["refNo"] = "";
    }

    if (data.amt === "") {
      errors["amt"] = "Field cannot be empty";
    } else {
      errors["amt"] = "";
    }


    if (data.date === [] || data.date.length !== 3) {
      errors["date"] = "Please enter Date of Paying Fees";
    } else {
      errors["date"] = "";
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
      const url = BACKEND_URL + "/student/editStudentInfo";
      const body = {
        personalInfo: personalData.personalInfo,
        academicsInfo: personalData.academicsInfo,
        professionalExperience: personalData.professionalExperience,
        feesDetails: data,
        id: personalData._id,
        message: "Fees Details Completed"
      };
      axios
        .post(url, body, {
          headers: {
            "pgderp-website-jwt": localStorage.getItem("pgderp-website-jwt"),
          },
        })
        .then((res) => {
          alert(res.data.message);
          navigate("/student/documents", {
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
              {renderText({ label: "Fees Payment Details" })}
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
                {/* AMOUNT */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Fees Amount" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    {renderInputTextDisabled({
                      label: "1200",
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* Bank Name */}

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
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Bank Name" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderMultiInputText({
                      label: "",
                      name: "bank",
                      stateVar,
                      handleOnChange: handleOnChange,
                      personalData: personalData,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Reference Number" })}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    {renderMultiInputText({
                      label: "",
                      name: "refNo",
                      stateVar,
                      handleOnChange: handleOnChange,
                      personalData: personalData,
                    })}
                  </StyledTableCell>
                </StyledTableRow>

                {/* DATE */}
                <StyledTableRow>
                  <StyledTableCell sx={{ padding: "8px" }}>
                    <Box mb={0.5} mt={0.5} mr={0}>
                      {renderText1({ label: "Date of Fees Payment: (MM/DD/YYYY)" })}
                    </Box>
                  </StyledTableCell>

                  {personalData &&
                    "feesDetails" in personalData &&
                    "date" in personalData.feesDetails &&
                    personalData.feesDetails.date.length === 3 && (personalData.applicationFilled==false || (personalData.applicationFilled==true && personalData.modifications.includes("date") && personalData.feesDetailsEditable==true)) && (
                      <StyledTableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                              <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                name="date"
                                defaultValue={dayjs(
                                  personalData.feesDetails.date[2] +
                                    "-" +
                                    personalData.feesDetails.date[1] +
                                    "-" +
                                    personalData.feesDetails.date[0]
                                )}
                                onChange={(value) =>
                                  handleOnChangeDate("date", value)
                                }
                              ></DatePicker>
                              <Typography sx={{ width: "100%", color: "red" }}>
                                {stateVar["errors"]["date"]}
                              </Typography>
                            </DemoItem>
                          </DemoContainer>
                        </LocalizationProvider>
                      </StyledTableCell>
                    )}

{personalData &&
                    "feesDetails" in personalData &&
                    "date" in personalData.feesDetails &&
                    personalData.feesDetails.date.length === 3 && personalData.applicationFilled==true && (!personalData.modifications.includes("date")) && (
                      <StyledTableCell>
                        {renderInputTextDisabled({
                      label: personalData.feesDetails.date[0] +
                      "-" +
                      personalData.feesDetails.date[1] +
                      "-" +
                      personalData.feesDetails.date[2],
                    })}
                      </StyledTableCell>
                    )}
                

                {personalData &&
                  "feesDetails" in personalData &&
                  "date" in personalData.feesDetails &&
                  personalData.feesDetails.date.length === 0 && (
                    <StyledTableCell>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          {" "}
                          <DemoItem label="">
                            <DatePicker
                              disableFuture
                              // views={['year', 'month', 'day']}
                              name="date"
                              onChange={(value) =>
                                handleOnChangeDate("date", value)
                              }
                            ></DatePicker>
                            <Typography sx={{ width: "100%", color: "red" }}>
                              {stateVar["errors"]["date"]}
                            </Typography>
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </StyledTableCell>
                  )}

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

FeesDetails.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default FeesDetails;
