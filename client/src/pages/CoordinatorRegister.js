import { React, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Checkbox from '@mui/material/Checkbox';
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
import FormControlLabel from '@mui/material/FormControlLabel';

const theme = createTheme();
const initialFValues = {
  fullname: "",
  email: "",
  mobile: "",
  password: "",
  cpassword: ""
};
export default function UserRegister() {
  const validate = (fieldValues = values) => {
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

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );
  const [courses, setCourses] = useState([]);
  const handleCheck = (event) => {
    var updatedCourses = [...courses];
    if (event.target.checked) {
      updatedCourses = [...courses, event.target.value];
    }
    else{
      updatedCourses.splice(courses.indexOf(event.target.value), 1);
    }
    setCourses(updatedCourses);
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const data = {
        name: values.fullname,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        courses: courses
      };
    //   console.log(data);
      const token = localStorage.getItem("pgderp-website-jwt")
      const url = BACKEND_URL + "/coordinator/coordinatorRegister";
      axios
        .post(url, {data, headers:{ "pgderp-website-jwt": token }
        })
        .then(res => {
          alert(res.data.message);
        })
        .catch(err => {
          console.log(err.response || err);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          background: "linear-gradient(to bottom, #42a7f5, #dae9eb)",
          position: "absolute",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Container
          component="main"
          item="true"
          maxWidth="xs"
          style={{
            backgroundColor: "rgba(215, 198, 165, 0.4)",
            borderRadius: "32px"
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
                m: 3,
                bgcolor: "#012d5e",
                width: "128px",
                height: "128px"
              }}
            ></Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: "20px" }}
            >
              Add Co-ordinator Details
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
                  <FormControlLabel control={<Checkbox onChange={handleCheck} value="PGDDSAI"/>} label="PGDDSAI" />
                  <FormControlLabel control={<Checkbox onChange={handleCheck} value="PGDESIoT"/>} label="PGDESIoT" />
                  <FormControlLabel control={<Checkbox onChange={handleCheck} value="PGDERP"/>} label="PGDERP" />
                  <FormControlLabel control={<Checkbox onChange={handleCheck} value="PGDIPDD"/>} label="PGDIPDD" />
                  <FormControlLabel control={<Checkbox onChange={handleCheck} value="PGDIA"/>} label="PGDIA" />
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={handleSubmit}
                      style={{
                        width: "100%",
                        marginLeft: "2%",
                        background: "#feca0a",
                        color: "#012d5e",
                        fontSize: "18px",
                        fontWeight: "bold",
                        letterSpacing: "2px"
                      }}
                    >
                      Register
                    </Button>
                  </Grid>

                  <Grid item xs>
                    <Link
                      href="/coordinator/login"
                      variant="body2"
                      style={{
                        textDecoration: "none",
                        color: "#1d8ffe"
                      }}
                    >
                      {"Already Registered? Log In"}
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
