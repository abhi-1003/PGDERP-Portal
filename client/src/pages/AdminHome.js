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

const exportToExcel = () => {
  const url = BACKEND_URL + "/student/allStudentData";
  const excel_data = [];
  const XLSX = require("xlsx");
  axios.get(url).then((res) => {
    let student_data = res.data;
    console.log(student_data);
    student_data.forEach((student) => {
      let course = "";
      let lastName = "";
      let firstName = "";
      if (student.personalInfo.course) {
        course = student.personalInfo.course;
      }
      if (student.personalInfo.lastName) {
        lastName = student.personalInfo.lastName;
      }

      if (student.personalInfo.firstName) {
        firstName = student.personalInfo.firstName;
      }

      console.log(course, lastName, firstName);

      excel_data.push({
        course,
        lastName,
        firstName,
      });
    });
    console.log(excel_data);

    const XLSX = require("xlsx");
    const workSheet = XLSX.utils.json_to_sheet(excel_data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Students Data");
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Students Data.xlsx");
  });
};

export default function AdminHome() {
  const navigate = useNavigate();

  const registerCoordinator = () => {
    navigate("/admin/registerCoord");
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
          }}>
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
                    onClick={registerCoordinator}
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
                    onClick={registerCoordinator}
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
                    onClick={exportToExcel}
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
        </div>
      </ThemeProvider>
    </>
  );
}
