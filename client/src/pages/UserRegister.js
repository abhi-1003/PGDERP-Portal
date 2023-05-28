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

const theme = createTheme();
const initialFValues = {
  fullname: "",
  email: "",
  mobile: "",
  password: "",
  cpassword: ""
};

export default function UserRegister() {
  localStorage.clear();
  const [pgderpID, setpgderpID] = useState("");
  const navigate = useNavigate();
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
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      const initial_url = BACKEND_URL + "/student/noStudents";
      axios.get(initial_url).then(res => {
        const ind = res.data.data.toString().padStart(4, "0");
        const id = `ER23${ind}`;
        // const url = BACKEND_URL + "/student/userRegister";
        const data = {
          name: values.fullname,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
          pgderpID: id
        };
        console.log(data);
        navigate("/otpscript", {
          state: {
            data: data
          }
        });
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <NavBar loggedin={false} /> */}
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
                bgcolor: "#012d5e",
                width: "128px",
                height: "128px"
              }}
            ></Avatar>
            <Typography component="h1" variant="h5">
              Student Register
            </Typography>
            <Typography component="h6" variant="h6">
              Please Enter Correct Details
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
                  <Grid item xs={12}>
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
                        alignItems: "center"
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
