import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TableContainer, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Link } from "react-router-dom";
const data = [
    {
        Sr: "1",
        Name: "A B C",
        Status: "Accepted"
    },
    {
        Sr: "2",
        Name: "P Q R",
        Status: "Pending"
    }
]

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
        color:'white',
    },
    tableCell: {
        paddingLeft: theme.spacing(3),

    },
}));

function HomeContent() {
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
                        {data.map((data) => {
                            return (
                                
                                    <TableRow>
                                        <TableCell className={classes.tableCell} width="10%">{data.Sr}</TableCell>
                                        <TableCell className={classes.tableCell} width="70%"><Link to='/application/{data.SR}' style={{textDecoration:'none', color:'black'}}>{data.Name}</Link></TableCell>
                                        <TableCell className={classes.tableCell} width="20%"><Link to='/application/{data.SR}' style={{textDecoration:'none', color:'black'}}>{data.Status}</Link></TableCell>
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