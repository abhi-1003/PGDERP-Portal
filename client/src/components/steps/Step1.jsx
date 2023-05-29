import { Box, Grid, Paper } from "@material-ui/core";
import React from "react";
import { useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {
  renderText,
  renderButton,
  renderInputText,
  renderText1,
  renderMultiInputText,
  renderInputSelect,
} from "../common/displayComponents";
import Select from "@material-ui/core";
import DocViewer from "../../pages/DocViewer";
// "CourseName":"",
// "NameOfUniversity":"",
// "Specialization":"",
// "PeriodFrom":"",
// "PeriodTo":"",
// "Grade":""
export default function Step1({ state, handleOnChange, handleNext, onFileChange }) {
  const names = ["COEP Tech", "VPKBIT, Baramati", "VPKBIT, Nashik"];
  return (
    <Paper component={Box} p={2}>
      <Grid container spacing={2} style={{ justifyContent: "center" }}>
        <Box mt={1} mb={2}>
          {renderText({ label: "Candidate Details" })}
        </Box>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "1" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Candidate ID:" })}
        </Box>
        <Grid item xs={12} sm={6}>
          {renderInputText({
            label: "",
            name: "ID",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "2" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Course:" })}
        </Box>
        <Grid item xs={12} sm={6}>
          {renderInputText({
            label: "",
            name: "course",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "4" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Name:" })}
        </Box>
        <Grid item xs={12} sm={3}>
          {renderInputText({
            label: "Surname",
            name: "lastName",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
        <Grid item xs={12} sm={3}>
          {renderInputText({
            label: "First Name",
            name: "firstName",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
        <Grid item xs={12} sm={3}>
          {renderInputText({
            label: "Middle Name",
            name: "middleName",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "5" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Postal Address" })}
        </Box>
        <Grid item xs={12} sm={6}>
          {renderMultiInputText({
            label: "",
            name: "Address",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "6" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Permanent Address" })}
        </Box>
        <Grid item xs={12} sm={6}>
          {renderMultiInputText({
            label: "",
            name: "permanentAddress",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "7" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "E-mail ID" })}
        </Box>
        <Grid item xs={12} sm={6}>
          {renderInputText({
            label: "",
            name: "email",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "8" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Gender" })}
        </Box>
        <Grid item xs={12} sm={2}>
          {renderInputSelect({
            label: "",
            name: "gender",
            state,
            handleOnChange: handleOnChange,
            arr: [
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "Other", label: "Other" },
            ],
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "9" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Physical Disabilities" })}
        </Box>
        <Grid item xs={12} sm={6}>
          {renderInputText({
            label: "",
            name: "phyDis",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "10" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Phone Number" })}
        </Box>
        <Grid item xs={12} sm={6}>
          {renderInputText({
            label: "",
            name: "number",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "11" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Parents/Husband's Name:" })}
        </Box>
        <Grid item xs={12} sm={6}>
          {renderInputText({
            label: "",
            name: "PHname",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "12" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Parent's/Husband's Email-ID:" })}
        </Box>
        <Grid item xs={12} sm={3}>
          {renderInputText({
            label: "",
            name: "PHemail",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "13" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Parent's/Husband's Phone Number:" })}
        </Box>
        <Grid item xs={12} sm={3}>
          {renderInputText({
            label: "",
            name: "PHnumber",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "1px" }}>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "15" })}
        </Box>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Domicile State of Candidate:" })}
        </Box>
        <Grid item xs={12} sm={2}>
          {renderInputText({
            label: "",
            name: "domicileState",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
        <Box mb={2} mt={2} mr={2}>
          {renderText1({ label: "Nationality:" })}
        </Box>
        <Grid item xs={12} sm={2}>
          {renderInputText({
            label: "",
            name: "nationality",
            state,
            handleOnChange: handleOnChange,
          })}
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="flex-end">
        <Box p={2}>
          {renderButton({ label: "next", handleOnClick: handleNext })}
        </Box>
      </Grid>
    </Paper>
  );
}
