import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import axios from "axios";
import { BACKEND_URL } from '../../config';

const useStyles = makeStyles((theme) => ({
    homeContent: {
        padding: theme.spacing(4),

    },
    title: {
        fontFamily: 'Franklin Gothic Medium',
        fontSize: '2rem',
        color: '#057BDB',
    },
    tableContainer: {
        margin: 'auto',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        borderRadius: "5px"

    },
    table: {
        borderRadius: "5px",
    },
    tableHeadCell: {
        fontWeight: 'bold',
        fontSize: '1rem',
        background: "#05AAE2",
        paddingLeft: theme.spacing(3),
        color: 'white',
    },
    tableCell: {
        paddingLeft: theme.spacing(3),

    },
}));

function Application2(props) {
    const classes = useStyles();
    const id = props.data;
    const [data,setData] = useState({});
    const [loading,setLoading] = useState(false);
    const url = BACKEND_URL + `/student/academicDetails?id=${id}`
    useEffect(()=>{
        axios
        .get(url)
        .then((response) => {
            setData(response.data);
            setLoading(true);
            console.log(response.data)
            // console.log(response.data.academicsInfo.InstituteSSC)
        })
        .catch((error) => {
            console.log(error);
        })
    },[url])
    return (
        <div>
            <div className={classes.homeContent}>
                <Typography variant='h5' className={classes.title}>Educational Details</Typography><br />
                <Typography variant='h6' style={{ textAlign: "center" }}>Educational Qualification in Reverse  Chronological Order  </Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.tableHeadCell} width="25%"><b>Examination</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="40%"><b>Name Of the Institute/University</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="20%" style={{ textAlign: "center" }}><b>Duration</b>
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            From
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            To
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className={classes.tableHeadCell} width="15%"><b>Percentage Marks%</b></TableCell>
                            </TableRow>
                        </TableHead>
                       {loading?( 
                       <TableBody>
                        <TableRow>
                                <TableCell className={classes.tableCell} width="25%">SSC</TableCell>
                                <TableCell className={classes.tableCell} width="40%">{data.academicsInfo.InstituteSSC}</TableCell>
                                <TableCell className={classes.tableCell} width="20%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['academics']['SSCFrom']}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        {data['academics']['SSCTo']}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data['academics']['SSCmarks']} %</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="25%">HSC</TableCell>
                                <TableCell className={classes.tableCell} width="40%">{data['academics']['InstituteHSC']}</TableCell>
                                <TableCell className={classes.tableCell} width="20%">
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={6} >
                                        {data['academics']['HSCFrom']}
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                        {data['academics']['HSCTo']}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data['academics']['HSCmarks']} %</TableCell>
                            </TableRow>
                            {data['academics']['examinationDiploma'] !== undefined?
                            <TableRow>
                            <TableCell className={classes.tableCell} width="25%">Diploma</TableCell>
                            <TableCell className={classes.tableCell} width="40%">{data['academics']['InstituteDiploma']}</TableCell>
                            <TableCell className={classes.tableCell} width="20%">
                                <Grid container spacing={2} >
                                    <Grid item xs={12} sm={6} >
                                    {data['academics']['DiplomaFrom']}
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                    {data['academics']['DiplomaTo']}
                                    </Grid>
                                </Grid></TableCell>
                            <TableCell className={classes.tableCell} width="15%">{data['academics']['Diplomamarks']} %</TableCell>
                        </TableRow>:<></>}
                        </TableBody>):
                        <></>}
                    </Table>
                </TableContainer><br />


                <Typography variant='h6' style={{ textAlign: "center" }}>Graduation / Post Graduation Details </Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.tableHeadCell} width="10%"><b>Examination</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="25%"><b>Name Of the Institute/University</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="15%"><b>Specialization</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="15%" style={{ textAlign: "center" }}><b>Duration</b>
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            From
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            To
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className={classes.tableHeadCell} width="10%"><b>Final Year Percentage Marks%</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="10%"><b>Aggregate Percentage Marks%</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="15%"><b>Total No. Of Backlogs</b>
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            Dead
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            Alive
                                        </Grid>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {loading?
                        (<TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">UG</TableCell>
                                <TableCell className={classes.tableCell} width="25%">{data['academicsUGPG']['InstituteGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data['academicsUGPG']['SpecializationGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['academicsUGPG']['GradFrom']}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        {data['academicsUGPG']['GradTo']}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data['academicsUGPG']['FinalYearMarksGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data['academicsUGPG']['AggregateMarksGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['academicsUGPG']['DeadBacklogsGrad']}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {data['academicsUGPG']['AliveBacklogGrad']}
                                        </Grid>
                                    </Grid></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">PG</TableCell>
                                <TableCell className={classes.tableCell} width="25%">{data['academicsUGPG']['InstitutePostGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data['academicsUGPG']['SpecializationPostGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['academicsUGPG']['PostGradFrom']}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        {data['academicsUGPG']['PostGradTo']}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data['academicsUGPG']['FinalYearMarksPostGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data['academicsUGPG']['AggregateMarksPostGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['academicsUGPG']['DeadBacklogsPostGrad']}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        {data['academicsUGPG']['AliveBacklogPostGrad']}
                                        </Grid>
                                    </Grid></TableCell>
                            </TableRow>
                        </TableBody>):<></>}
                    </Table>
                </TableContainer>
                <Grid container spacing={2} style={{ marginBottom: "1px", width: '90%', margin: "auto" }}>
                    <Grid item xs={12} sm={3}>
                        <b>Duration Of Educational Gaps</b><br /> (Gap During Academics)
                    </Grid>
                    <Grid item xs={12} sm={3} style={{ textAlign: "center" }}>
                        {data.GradFrom - data.HSCTo}
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <b>Reason of Educational Gap</b>
                    </Grid>
                    <Grid item xs={12} sm={3}>

                    </Grid>
                </Grid><br />

                <Typography variant='h6' style={{ textAlign: "center" }}>Other Course Details (In Reverse Chronological Order) </Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.tableHeadCell} width="30%"><b>Course Name</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="15%" style={{ textAlign: "center" }}><b>Period</b>
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            From
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            To
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className={classes.tableHeadCell} width="10%"><b>Grade/Marks%</b></TableCell>
                            </TableRow>
                        </TableHead>
                        {loading?
                        (<TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="30%">{data['othercourses'][0]}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['othercourses'][1]}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        {data['othercourses'][2]}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data['othercourses'][3]}</TableCell>
                            </TableRow>
                        </TableBody>)
                        :<></>}
                    </Table>
                </TableContainer>


            </div>
        </div>
    )
}

export default Application2