import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm, Form } from "./Form";
import Input from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import bg_pic from "../components/images/coepBuilding.png"
import Header from '../components/Header'

const theme = createTheme();
const initialFValues = {
  fullname: "",
  email: "",
  mobile: "",
  password: "",
  cpassword: "",
  course: ""
};

export default function UserRegister() {
  localStorage.clear();
  const [course, setCourse] = useState("");
  const navigate = useNavigate();
  const validate = (fieldValues = values) => {
    values.course = course;
    let temp = { ...errors };
    for (const key in fieldValues) {
      temp[key] = fieldValues[key] ? "" : "This field is required.";
    }
    const { email, mobile, cpassword } = fieldValues;
    if (email && !/$^|.+@.+..+/.test(email)) {
      temp.email = "Email is not valid.";
    }
    if (
      mobile &&
      !new RegExp("^([0|+[0-9]{1,5})?([7-9][0-9]{9})$").test(mobile)
    ) {
      temp.mobile = "mobile is not valid";
    }
    if (cpassword && cpassword !== values.password) {
      temp.cpassword = "Passwords do not match. ";
    }
    setErrors(temp);
    if (fieldValues === values) return Object.values(temp).every(x => x === "");
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value)
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const initial_url = BACKEND_URL + "/student/noStudents";
      let course = values.course;
      let email = values.email;
      let body = {course, email};
      axios.post(initial_url, body).then(res => {
        if(res.data.message === "User with same email already registered"){
          alert(res.data.message)
        }
        else{
          const ind = res.data.data.toString().padStart(4, "0");
          let id = "";
          if(course === "PGDEM"){
            id = `EM23${ind}`;
          }
          if(course === "PGDERP"){
            id = `ERP23${ind}`;
          }
          if(course === "PGDDSAI"){
            id = `DSAI23${ind}`;
          }
          if(course === "PGDESIoT"){
            id = `ESIoT23${ind}`;
          }
          if(course === "PGDIPDD"){
            id = `IPDD23${ind}`;
          }
          if(course === "PGDIA"){
            id = `DIA23${ind}`;
          }
          // const url = BACKEND_URL + "/student/userRegister";
          const data = {
            name: values.fullname,
            email: values.email,
            mobile: values.mobile,
            password: values.password,
            course: values.course,
            registrationID : id,
          };
          navigate("/otpscript", {
            state: {
              data: data
            }
        });
        }
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <NavBar loggedin={false} /> */}
      <div
        style={{
          backgroundImage: `url(${bg_pic})`,
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          minHeight: "100vh",
          backgroundColor: "#767676"
        }}
      >
            <Header />

        <Container
          component="main"
          item="true"
          maxWidth="sm"
          style={{
            backgroundColor: "#E5EDF1",
            borderRadius: "32px",
            opacity: 0.8,
            paddingBottom: "5px"
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#012d5e",
                width: "100px",
                height: "100px",
                marginTop: "4px"
              }}
            ></Avatar>
            <Typography component="h1" variant="h5">
              COEP PG Diploma Admissions
            </Typography>
            <Typography component="h6" variant="h6">
              Application Form
            </Typography>
            <Form onSubmit={handleSubmit}>
              <Grid align="center" item xs={12}>
                <Grid align="center" item xs={12}>
                  <Input
                    name="fullname"
                    label="Full Name*"
                    value={values.fullname}
                    onChange={handleInputChange}
                    error={errors.fullname}
                  />
                  <Input
                    name="email"
                    label="Email*"
                    value={values.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />
                  <Input
                    name="mobile"
                    label="Mobile*"
                    value={values.mobile}
                    onChange={handleInputChange}
                    error={errors.mobile}
                  />
                  <Input
                    name="password"
                    type="password"
                    label="Password*"
                    value={values.password}
                    onChange={handleInputChange}
                    error={errors.password}
                  />
                  <Input
                    name="cpassword"
                    type="password"
                    label="Confirm Password*"
                    value={values.cpassword}
                    onChange={handleInputChange}
                    error={errors.cpassword}
                  />
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Course</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={course}
                        label="Course*"
                        onChange={handleCourseChange}
                      >
                         <MenuItem value={"PGDERP"}>Enterprise Resourse Planning(PGDERP)</MenuItem>
                         <MenuItem value={"PGDIPDD"}>Integrated Product Design and Development(PGDIPDD)</MenuItem>
                         <MenuItem value={"PGDDSAI"}>Data Science and Artificial Intelligence(PGDDSAI)</MenuItem>
                         <MenuItem value={"PGDESIoT"}>Embedded Systems for Internet of Things(PGDESIoT)</MenuItem>
                        <MenuItem value = {"PGDEM"}>Electric Mobility(PGDEM)</MenuItem>
                        <MenuItem value={"PGDIA"}>Industrial Automation(PGDIA)</MenuItem>
                      </Select>
                      {!course && <FormHelperText sx= {{color: "red"}}>{errors.course}</FormHelperText>}
                      
                    </FormControl>
                  </Box>
                  <Grid item xs={12}>
                    <Typography component="p" variant="body2">
                      One email can be used for only 1 course.
                    </Typography>
                    <Typography component="p" variant="body2">
                    To register for multiple courses, use multiple emails to register.
                    </Typography>
                    <Typography component="p" variant="body2">
                    OTP will be sent to entered Email-ID
                    </Typography>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 1, mb: 1 }}
                      style={{
                        width: "100%",
                        marginLeft: "2%",
                        background: "#feca0a",
                        color: "#012d5e",
                        fontSize: "18px",
                        fontWeight: "bold"
                      }}
                    >
                      Proceed and verify your details
                    </Button>
                  </Grid>

                  <Grid item xs>
                    <Link
                      href="/student/login"
                      variant="body2"
                      style={{
                        color: "blue",
                        alignItems: "center"
                      }}
                    >
                      {"Already Registered? Log In"}
                    </Link>
                  </Grid>
                  <Grid item xs sx={{ p: 1}}>
                        <Typography>For any Software Related Queries: pgdadmission@coeptech.ac.in</Typography>
                      </Grid>
                  <Grid item xs>
                    <Link
                      href={require('../docs/how-to-apply.pdf')}
                      download="How to Apply for PGD Courses 2023"
                      target="_blank"
                      rel="nonreferrer"
                      variant="body2"
                      style={{
                        color: "black",
                        fontWeight: 600,
                        textDecoration: "none",
                        alignItems: "center"
                      }}
                    >
                      {"Need Help? Click Here to Download Instructions"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
