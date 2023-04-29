import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

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
    const {data}=props
    const classes = useStyles();

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
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="25%">SSC Equivalent (Std X/level 10)</TableCell>
                                <TableCell className={classes.tableCell} width="40%">{data.InstituteSSC}</TableCell>
                                <TableCell className={classes.tableCell} width="20%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                            {data.SSCFrom}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {data.SSCTo}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data.SSCMarks}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="25%">HSC Equivalent (Std X/level 10)</TableCell>
                                <TableCell className={classes.tableCell} width="40%">{data.InstituteHSC}</TableCell>
                                <TableCell className={classes.tableCell} width="20%">
                                    <Grid container spacing={2} >
                                        <Grid item xs={12} sm={6} >
                                            {data.HSCFrom}
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            {data.HSCTo}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data.HSCMarks}</TableCell>
                            </TableRow>
                        </TableBody>
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
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">Graduation</TableCell>
                                <TableCell className={classes.tableCell} width="25%">{data.InstituteGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data.SpecializationGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                            {data.GradFrom}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {data.GradTo}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data.FinalYearMarksGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data.AggregateMarksGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                            {data.DeadBacklogsGrad}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {data.AliveBacklogGrad}
                                        </Grid>
                                    </Grid></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="10%">Post Graduation</TableCell>
                                <TableCell className={classes.tableCell} width="25%">{data.InstitutePostGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">{data.SpecializationPostGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                            {data.PostGradFrom}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {data.PostGradTo}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data.FinalYearMarksPostGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data.AggregateMarksPostGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                            {data.DeadBacklogsPostGrad}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {data.AliveBacklogPostGrad}
                                        </Grid>
                                    </Grid></TableCell>
                            </TableRow>
                        </TableBody>
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
                                <TableCell className={classes.tableHeadCell} width="25%"><b>Name Of the Institute/University</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="20%"><b>Specialization</b></TableCell>
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
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="30%">Graduation</TableCell>
                                <TableCell className={classes.tableCell} width="25%">{data.InstituteGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="20%">{data.SpecializationGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                            {data.GradFrom}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {data.GradTo}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data.FinalYearMarksGrad}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tableCell} width="30%">Graduation</TableCell>
                                <TableCell className={classes.tableCell} width="25%">{data.InstituteGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="20%">{data.SpecializationGrad}</TableCell>
                                <TableCell className={classes.tableCell} width="15%">
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6}>
                                            {data.GradFrom}
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            {data.GradTo}
                                        </Grid>
                                    </Grid></TableCell>
                                <TableCell className={classes.tableCell} width="10%">{data.FinalYearMarksGrad}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>
        </div>
    )
}

export default Application2