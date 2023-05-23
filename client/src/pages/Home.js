import { React, Component, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// import NavBar from "../components/Navbar/Navbar";
// import "../CSS/mainlogin.css";
import { BACKEND_URL } from "../config";
import axios from "axios";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#056676",
      contrastText: "#fff",
    },
  },
});

export default function Home() {
  const navigate = useNavigate();

  (function() {
    window.onpageshow = function(event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  })();

  const [links, setLinks] = useState();

  const handleRoute1 = () => {
    navigate("/student/login");
  };

  const handleRoute2 = () => {
    navigate("/admin/login");
  };

  const handleRoute3 = () => {
    navigate("/cordinator/login");
  };

  return (
    <>
      <div style={{ marginTop: "10spx" }}>
        <div className="all">
          {/* <NavBar /> */}
          <div className="bod">
            <ThemeProvider theme={theme}>
              <div
                className="container_login"
                id="container"
                style={{ marginTop: "90px" }}>
                <div className="form-container log-in-container">
                  <div className="form-container">
                    <Typography component="h1" variant="h5" mt={2}>
                      <b>Sign in </b>
                    </Typography>
                    <div className="social-container">
                      <Avatar
                        sx={{
                          m: 0,
                          bgcolor: "#056676",
                          height: 60,
                          width: 60,
                        }}></Avatar>
                    </div>

                    <Grid container spacing={6}>
                      <Grid item xs={6}>
                        <Button
                          color="neutral"
                          onClick={handleRoute1}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}>
                          Student
                          <br /> Login
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          color="neutral"
                          onClick={handleRoute2}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}>
                          Admin Login
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        color="neutral"
                        onClick={handleRoute3}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Co-ordinaator Login
                      </Button>
                    </Grid>
                  </div>
                </div>
                <div className="overlay-container">
                  <div className="overlay">
                    <div className="overlay-panel overlay-right">
                      <Typography component="h1" variant="h5" mt={2}>
                        <b>Important Announcements</b>
                      </Typography>
                      <div className="scroll-box">
                        {links
                          ? links.map((item, key) => (
                              <p key={key} className="link">
                                <a className="main_link" href={item.link}>
                                  {item.title}
                                </a>
                              </p>
                            ))
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
}
