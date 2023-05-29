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
        })
        .catch((error) => {
            console.log(error);
        })
    },[])
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
                                <TableCell className={classes.tableCell} width="40%">{data['InstituteSSC']}</TableCell>
                                <TableCell className={classes.tableCell} width="20%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['SSCFrom'][1]}{data['SSCFrom'][0]}/{data['SSCFrom'][2]}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        {data['SSCTo'][1]}{data['SSCTo'][0]}/{data['SSCTo'][2]}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data['SSCmarks']}</TableCell>
                            </TableRow>
                            {data['HSCFilled'] ? 
                            <TableRow>
                            <TableCell className={classes.tableCell} width="25%">HSC</TableCell>
                            <TableCell className={classes.tableCell} width="40%">{data['InstituteHSC']}</TableCell>
                            <TableCell className={classes.tableCell} width="20%">
                                <Grid container spacing={2} >
                                    <Grid item xs={12} sm={6} >
                                    {data['HSCFrom'][0][1]/data['HSCFrom'][0][2]}
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                    {data['HSCTo'][0][1]/data['HSCTo'][0][2]}
                                    </Grid>
                                </Grid></TableCell>
                            <TableCell className={classes.tableCell} width="15%">{data['HSCmarks']}</TableCell>
                        </TableRow>:
                        <></>}
                        {data['DiplomaFilled'] ? 
                        <TableRow>
                        <TableCell className={classes.tableCell} width="25%">Diploma</TableCell>
                        <TableCell className={classes.tableCell} width="40%">{data['InstituteDiploma']}</TableCell>
                        <TableCell className={classes.tableCell} width="20%">
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={6} >
                                {data['DiplomaFrom'][0][1]/data['DiplomaFrom'][0][2]}
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                {data['DiplomaTo'][0][1]/data['DiplomaTo'][0][2]}
                                </Grid>
                            </Grid></TableCell>
                        <TableCell className={classes.tableCell} width="15%">{data['Diplomamarks']}</TableCell>
                    </TableRow>:
                    <></>}
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
                                <TableCell className={classes.tableCell} width="25%">{data['InstituteGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data['SpecializationGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['GradFrom'][0][1]/data['GradFrom'][0][2]}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        {data['GradTo'][0][1]/data['GradTo'][0][2]}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data['FinalYearMarksGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data['AggregateMarksGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['DeadBacklogsGrad']}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {data['AliveBacklogGrad']}
                                        </Grid>
                                    </Grid></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">PG</TableCell>
                                <TableCell className={classes.tableCell} width="25%">{data['InstitutePostGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data['SpecializationPostGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['PostGradFrom'][0][1]/data['PostGradFrom'][0][2]}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        {data['PostGradTo'][0][1]/data['PostGradTo'][0][2]}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data['FinalYearMarksPostGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data['AggregateMarksPostGrad']}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                        {data['DeadBacklogsPostGrad']}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                        {data['AliveBacklogPostGrad']}
                                        </Grid>
                                    </Grid></TableCell>
                            </TableRow>
                        </TableBody>):<></>}
                    </Table>
                </TableContainer>
                {/* <Grid container spacing={2} style={{ marginBottom: "1px", width: '90%', margin: "auto" }}>
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
                </Grid><br /> */}

                <Typography variant='h6' style={{ textAlign: "center" }}>Other Course Details (In Reverse Chronological Order) </Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.tableHeadCell} width="30%"><b>Course Name</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="30%"><b>University Name</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="30%"><b>Specialization Name</b></TableCell>
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
                            {data['otherCourses'].map((item,index)=>{
                                return (
                                    <TableRow>
                                    <TableCell className={classes.tableCell} width="30%">{item['courseName']}</TableCell>
                                    <TableCell className={classes.tableCell} width="30%">{item['uniName']}</TableCell>
                                    <TableCell className={classes.tableCell} width="30%">{item['specialization']}</TableCell>
                                    <TableCell className={classes.tableCell} width="15%">
                                        <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                            <Grid item xs={12} sm={6}>
                                            {item['periodFrom']}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                            {item['periodTo']}
                                            </Grid>
                                        </Grid></TableCell>
                                    <TableCell className={classes.tableCell} width="10%">{item['grade']}</TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>)
                        :<></>}
                    </Table>
                </TableContainer>


            </div>
        </div>
    )
}

export default Application2