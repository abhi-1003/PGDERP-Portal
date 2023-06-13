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
// import NavBar from "../components/Navbar/Navbar";
import { useForm, Form } from "./Form";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

const theme = createTheme();
const initialFValues = {
  email: "",
  password: ""
};
export default function UserLogin() {
  localStorage.clear();
  const navigate = useNavigate();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      const isValidMail = /$^|.+@.+..+/.test(fieldValues.email);
      if (!isValidMail) temp.email = "Email is not valid.";
    }
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    setErrors(temp);
    if (fieldValues === values) return Object.values(temp).every(x => x === "");
  };

  const { values, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      const data = {
        email: values.email,
        password: values.password
      };
      // console.log(data);
      const url = BACKEND_URL + "/coordinator/coordinatorLogin";
      axios
        .post(url, data)
        .then(res => {
          alert(res.data.message);
          let token_dict = res.data.token;
        //   console.log(res.data);
          localStorage.setItem("pgderp-website-jwt", token_dict.token);
          localStorage.setItem("pgderp-website-role", "coordinator");
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("email", res.data.email);
          navigate("/coordinator");
        })
        .catch(err => {
          alert("Invalid credentials. Login again");
          console.log(err.response || err);
        });
    }
  };
  return (
    <>
      {/* <NavBar /> */}
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
                Coordinator Login
              </Typography>
              <Form onSubmit={handleSubmit}>
                <Grid align="center" xs={12} item>
                  <Grid align="center" item xs={12}>
                    <Input
                      name="email"
                      label="Email*"
                      value={values.email}
                      onChange={handleInputChange}
                      error={errors.email}
                    />
                    <Input
                      type="password"
                      name="password"
                      label="Password*"
                      value={values.password}
                      onChange={handleInputChange}
                      error={errors.password}
                    />
                    <Grid item xs={12}>
                      <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
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
                        Login
                      </Button>
                    </Grid>
                    <Grid
                      container
                      spacing={20}
                      style={{
                        alignItems: "center"
                      }}
                    >
                      <Grid item xs>
                        <Link
                          href="/"
                          variant="body2"
                          style={{
                            textDecoration: "none",
                            color: "#1d8ffe"
                          }}
                        >
                          {"Home Page"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}
