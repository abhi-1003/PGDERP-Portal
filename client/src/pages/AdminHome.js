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

export default function AdminHome() {
  const navigate = useNavigate();

  const registerCordinator = () => {
    navigate("/register_cord");
  };

  return (
    <>
      {/* <NavBar /> */}
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          style={{ marginTop: "120px" }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Grid align="center" xs={12} item>
              <Grid item xs={12}>
                <Button
                  onClick={registerCordinator}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    width: "100%",
                    marginLeft: "2%",
                    background: "#012d5e",
                  }}>
                  Add Co-ordinator
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={registerCordinator}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    width: "100%",
                    marginLeft: "2%",
                    background: "#012d5e",
                  }}>
                  Remove Co-ordinator
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={registerCordinator}
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    width: "100%",
                    marginLeft: "2%",
                    background: "#012d5e",
                  }}>
                  Download Excel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
