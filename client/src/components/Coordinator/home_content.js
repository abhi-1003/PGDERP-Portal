import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../config";
import axios from "axios";


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

function HomeContent() {
    const url = BACKEND_URL + "/student/applicants";
    axios.get(url)
    const [newdata, setNewdata] = useState([]);
    useEffect(() => {
        axios.get(url)
            .then(response => {
                console.log(response.data); 
                setNewdata(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.homeContent}>
            <Typography variant='h5' className={classes.title}>Applications</Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell className={classes.tableHeadCell} width="10%"><b>Sr. No.</b></TableCell>
                            <TableCell className={classes.tableHeadCell} width="70%"><b>Name</b></TableCell>
                            <TableCell className={classes.tableHeadCell} width="20%"><b>Status</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newdata.map((data,index) => {
                            return (
                                <TableRow>
                                    <TableCell className={classes.tableCell} width="10%">{index+1}</TableCell>
                                    <TableCell className={classes.tableCell} width="70%"><Link to={`/coordinator/application/${data._id}`} style={{ textDecoration: 'none', color: 'black' }}>{data.name}</Link></TableCell>
                                    <TableCell className={classes.tableCell} width="20%"><Link to={`/coordinator/application/${data._id}`} style={{ textDecoration: 'none', color: 'black' }}>{data.verificationField}</Link></TableCell>
                                </TableRow>

                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default HomeContent