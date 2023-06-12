import { Box, Grid, Paper } from '@material-ui/core'
import React from 'react'
import { renderText, renderButton, renderInputText, renderText1 } from '../common/displayComponents'
import { BACKEND_URL } from "../../config";
import axios from "axios";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom"

const handleSubmit = (state) => {
    const data = state.data;
    

        const personalInfo = {
        ID:data.ID,
        course:data.course,
        campusPreference:[data.campusPreference1,data.campusPreference2,data.campusPreference3],
        lastName:data.lastName,
        firstName:data.firstName,
        middleName:data.middleName,
        Address:data.Address,
        permanentAddress:data.permanentAddress,
        email:data.email,
        gender:data.gender,
        phyDis:data.phyDis,
        number:data.number,
        PHname:data.PHname,
        PHemail:data.PHemail,
        PHnumber:data.PHnumber,
        dob:data.dob,
        domicileState:data.domicileState,
        nationality:data.nationality,
        caste: data.caste,
        age: state.age,
    };

        const academicsInfo = {
        InstituteSSC:data.InstituteSSC,
        InstituteHSC:data.InstituteHSC,
        SSCFrom:data.SSCFrom,
        HSCFrom:data.HSCFrom,
        SSCTo:data.SSCTo,
        HSCTo:data.HSCTo,
        SSCmarks:data.SSCmarks,
        HSCmarks:data.HSCmarks,
        InstituteDiploma:data.InstituteDiploma,
        DiplomaFrom:data.DiplomaFrom,
        DiplomaTo:data.DiplomaTo,
        Diplomamarks:data.Diplomamarks,
        InstituteGrad:data.InstituteGrad,
        SpecializationGrad:data.SpecializationGrad,
        GradFrom:data.GradFrom,
        GradTo:data.GradTo,
        FinalYearMarksGrad:data.FinalYearMarksGrad,
        AggregateMarksGrad:data.AggregateMarksGrad,
        DeadBacklogsGrad:data.DeadBacklogsGrad,
        AliveBacklogGrad:data.AliveBacklogGrad,
        InstitutePostGrad:data.InstitutePostGrad,
        SpecializationPostGrad:data.SpecializationPostGrad,
        PostGradFrom:data.PostGradFrom,
        PostGradTo:data.PostGradTo,
        FinalYearMarksPostGrad:data.FinalYearMarksPostGrad,
        AggregateMarksPostGrad:data.AggregateMarksPostGrad,
        DeadBacklogsPostGrad:data.DeadBacklogsPostGrad,
        AliveBacklogPostGrad:data.AliveBacklogPostGrad,
        otherCourses:state.otherCourses,
        professionalExperience: state.professionalExperience,
        DroptoGrad: state.DroptoGrad,
        GradPeriod: state.GradPeriod,
        GradtoPostGrad: state.GradtoPostGrad,
        HSCFilled : state.HSCFilled,
        HSCtoDiploma: state.HSCtoDiploma,
        SSCtoDiploma: state.SSCtoDiploma,
        SSCtoHSC: state.SSCtoHSC,
        DiplomaFilled: state.DiplomaFilled,
    };

        const email = localStorage.getItem('email')
        const url = BACKEND_URL + "/student/editStudentInfo";
        const body = {
            email : email,
            personalInfo : personalInfo,
            academicsInfo : academicsInfo
        }
        console.log(body)
        axios
            .post(url, body)
            .then((res) => {
                alert(res.data);
            })
            Navigate("/student-home");
}

export default function Finished({state,handlePrev}){
    return( 
        <Paper component={Box} p={2}>
            <Grid container spacing={2} style={{justifyContent: "center"}}>
            <Box mt={1} mb={2}>
                {renderText({label:"Thank You for Submission!"})} 
                </Box>  
            </Grid> 
            <Grid container spacing={2} style={{justifyContent: "center"}}>
                <Box mt={1} mb={2}>
                {renderText({label:"Please Check the details by clicking on Previous Button"})} 
                </Box>                
            {/* <Box p={2}>{JSON.stringify(state,null,4)}</Box> */}
            </Grid>
            <Grid container spacing={2} style={{justifyContent: "center"}}>
                <Box mt={1} mb={2}>
                {renderText({label:"After Submiting You Cannot Edit the form"})}  
                </Box>                
            {/* <Box p={2}>{JSON.stringify(state,null,4)}</Box> */}
            </Grid>
            <Grid container spacing={2} justifyContent='space-between'>
                <Box p={2}>
                    {renderButton({ label: 'prev', handleOnClick: handlePrev })}
                </Box>
                <Box p={2}>
                <Button 
                 variant="outlined"
                 color="primary"
                 size="small"
                 style={{ marginTop: "5px" }}
                 onClick={() => {
                // Сlose the dialog and return the value
                handleSubmit(state)
              }}
              >submit</Button> 
                </Box>
            </Grid>                      
        </Paper>
    )
}