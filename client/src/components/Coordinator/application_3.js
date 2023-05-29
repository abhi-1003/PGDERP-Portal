import React, { useEffect, useState } from 'react'
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

function Application3(props) {
    const classes = useStyles();
    const id = props.data;
    const [data, setData] = useState({});
    const [loading,setLoading] = useState(false);
    const url = BACKEND_URL + `/student/professionalDetails?id=${id}`;
    useEffect(() => {
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
                <Typography variant='h5' className={classes.title}>Profesional Details</Typography><br />
                <Typography variant='h6' style={{ textAlign: "center" }}>Profesional Experinece (In Reverse  Chronological Order) </Typography>
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell className={classes.tableHeadCell} width="20%"><b>Name Of the Company</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="20%"><b>Designation and Rank</b></TableCell>
                                <TableCell className={classes.tableHeadCell} width="20%" style={{ textAlign: "center" }}><b>Period</b>
                                    <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            From
                                        </Grid>
                                        <Grid item xs={12} sm={6} style={{ marginTop: "6px" }}>
                                            To
                                        </Grid>
                                    </Grid>
                                </TableCell>
                                <TableCell className={classes.tableHeadCell} width="25%"><b>Nature Of Work</b></TableCell>
                            </TableRow>
                        </TableHead>
                        {loading?
                        (<TableBody>
                            {data.map((item)=>{
                                return (
                                    <TableRow>
                                    <TableCell className={classes.tableCell} width="20%">{item['companyName']}</TableCell>
                                    <TableCell className={classes.tableCell} width="20%">{item['rankDesignation']}</TableCell>
                                    <TableCell className={classes.tableCell} width="20%">
                                        <Grid container spacing={2} style={{ marginBottom: "1px" }}>
                                            <Grid item xs={12} sm={6}>
                                                {item['periodFrom']}
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                {item['periodTo']}
                                            </Grid>
                                        </Grid></TableCell>
                                    <TableCell className={classes.tableCell} width="25%">{item['workNature']}</TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>):<></>}
                    </Table>
                </TableContainer><br />
                {/* <Grid container spacing={2} style={{width: '90%', margin: "auto" }}>
                    <Grid item xs={12} sm={6}>
                        <b>Total Experience (YY-MM-DD)</b>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                </Grid><br />
                <Grid container spacing={2} style={{width: '90%', margin: "auto" }}>
                    <Grid item xs={12} sm={3}>
                        <b>Duration Of Professional Gaps</b>
                    </Grid>
                    <Grid item xs={12} sm={3} style={{textAlign:"center"}}>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <b>Reason Of Professional Gaps</b>
                    </Grid>
                    <Grid item xs={12} sm={3} style={{textAlign:"center"}}>
                    </Grid>
                </Grid> */}
            </div>
        </div>
    )
}

export default Application3