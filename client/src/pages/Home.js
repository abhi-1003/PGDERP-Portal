import { React, Component, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
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
    danger: "#e53e3e"
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85"
    },
    neutral: {
      main: "#056676",
      contrastText: "#fff"
    }
  }
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

  const [links, setLinks] = useState([
    { key: "1", title: "Announcement #1", link: "/notice/1" },
    { key: "2", title: "Announcement #2", link: "/notice/1" }
  ]);

  const handleRoute1 = () => {
    navigate("/student/login");
  };

  const handleRoute2 = () => {
    navigate("/admin/login");
  };

  const handleRoute3 = () => {
    navigate("/coordinator/login");
  };

  return (
    <>
      <div>
        <div className="all">
          {/* <NavBar /> */}
          <div
            className="bod"
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <ThemeProvider theme={theme}>
              <div
                className="container_login"
                id="container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "32px",
                  backgroundColor: "rgba(215, 198, 165, 0.4)",
                  padding: "12px"
                }}
              >
                <div className="form-container log-in-container">
                  <div className="form-container">
                    <Box
                      className="social-container"
                      sx={{
                        marginTop: 8,
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
                        style={{
                          marginBottom: "-140px",
                          top: "-165px"
                        }}
                      ></Avatar>
                    </Box>
                    <Typography
                      component="h1"
                      variant="h4"
                      textAlign="center"
                      style={{
                        color: "Black"
                      }}
                    >
                      <b>Sign in </b>
                    </Typography>
                    <Grid
                      spacing={6}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%"
                      }}
                    >
                      <Grid
                        item
                        xs={6}
                        style={{
                          width: "100%"
                        }}
                      >
                        <Button
                          color="neutral"
                          onClick={handleRoute1}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: 3,
                            mb: 2,
                            width: "160px",
                            backgroundColor: "#ffcc2a",
                            fontWeight: "bold",
                            fontSize: "18px",
                            width: "100%"
                          }}
                        >
                          Student Login
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          width: "100%"
                        }}
                      >
                        <Button
                          color="neutral"
                          size="large"
                          onClick={handleRoute3}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: 3,
                            fontWeight: "bold",
                            fontSize: "18px",
                            mb: 2,
                            backgroundColor: "#ffcc2a",
                            width: "100%"
                          }}
                        >
                          Co-ordinaator Login
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          width: "100%"
                        }}
                      >
                        <Button
                          color="neutral"
                          onClick={handleRoute2}
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: 3,
                            mb: 2,
                            width: "160px",
                            backgroundColor: "#ffcc2a",
                            fontWeight: "bold",
                            fontSize: "18px",
                            width: "100%"
                          }}
                        >
                          Admin Login
                        </Button>
                      </Grid>
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
                          ? links.map(item => (
                              <p key={item.key} className="link">
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
