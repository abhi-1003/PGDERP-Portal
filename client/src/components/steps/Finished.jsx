import { Box, Grid, Paper } from '@material-ui/core'
import React from 'react'
import { renderText, renderButton, renderInputText } from '../common/displayComponents'
import { BACKEND_URL } from "../../config";
import axios from "axios";
import Button from "@mui/material/Button";

const handleSubmit = (state) => {
    const data = state;
        console.log(data);

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
        caste: data.caste,};

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
        otherCourses:data.otherCourses,};

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
}

export default function Finished({state}){
    return( 
        <Paper component={Box} p={2}>
            <Grid container spacing={2} style={{justifyContent: "center"}}>
            <Box mt={1} mb={2}>
                {renderText({label:"Thank You for Submission!"})} 
                </Box>  
            </Grid> 
            <Grid container spacing={2} justifyContent='flex-middle'>
                <Box p={2}>{JSON.stringify(state,null,4)}</Box>
            </Grid>                 
            <Button 
            onClick={() => {
                // Сlose the dialog and return the value
                handleSubmit(state)
              }}
              variant="text">submit</Button>      
        </Paper>
    )
}